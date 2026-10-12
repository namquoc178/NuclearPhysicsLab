"""
Tăng tham số ?v= của các tệp CSS/JS/SVG đã thay đổi so với một nhánh gốc,
để trình duyệt của học sinh tải lại bản mới thay vì dùng bản cũ trong bộ nhớ đệm.

Chạy:  python3 tests/bump-versions.py main
"""

import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
base = sys.argv[1] if len(sys.argv) > 1 else "main"

changed = set(
    subprocess.run(
        ["git", "diff", "--name-only", base, "--", "."],
        cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout.split()
)
changed |= set(
    subprocess.run(
        ["git", "ls-files", "--others", "--exclude-standard"],
        cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout.split()
)

pattern = re.compile(r'((?:src|href)=")([^"?#]+\.(?:js|css|svg))(?:\?v=(\d+))?(")')

for page in [ROOT / "index.html", *sorted(ROOT.glob("simulations/*/index.html"))]:
    raw = page.read_bytes().decode("utf-8")
    eol = "\r\n" if "\r\n" in raw else "\n"
    text = raw.replace("\r\n", "\n")
    bumped = []

    def bump(match):
        prefix, ref, version, quote = match.groups()
        if ref.startswith("http"):
            return match.group(0)
        target = (page.parent / ref).resolve().relative_to(ROOT).as_posix()
        if target not in changed:
            return match.group(0)
        new_version = int(version) + 1 if version else 1
        bumped.append(f"{ref}?v={new_version}")
        return f"{prefix}{ref}?v={new_version}{quote}"

    new_text = pattern.sub(bump, text)
    if new_text != text:
        page.write_bytes(new_text.replace("\n", eol).encode("utf-8"))
        print(page.relative_to(ROOT), ", ".join(bumped))
