// questions.js – Bài 1: đáp án và phản hồi cho các câu hỏi có kiểm tra.
// Câu hỏi hiển thị trong index.html (khối .quick-check) hoặc trong thẻ
// "Câu hỏi trước khi tiếp tục" (bridge-explore, bridge-experiment).

QuickCheck.define({
    "ns-kp-1": {
        options: [
            {
                text: "Không. Cả ba đều có 1 proton.",
                correct: true
            },
            {
                text: "Có. Mỗi bước thêm 1 proton.",
                feedback: "Nếu số proton thay đổi thì nguyên tố cũng đổi, nhưng H-2 và H-3 vẫn là hydrogen."
            },
            {
                text: "Có, vì số khối A tăng.",
                feedback: "A tăng thật, nhưng A = Z + N. Em hãy xem trong mô phỏng Z hay N thay đổi."
            }
        ],
        explanation: "Cả ba đều là hydrogen nên Z = 1. Số neutron tăng N = 0, 1, 2 nên số khối tăng A = 1, 2, 3."
    },

    "ns-kp-2": {
        options: [
            { text: "C-14 nhiều hơn 2 neutron.", correct: true },
            {
                text: "C-12 nhiều hơn 2 neutron.",
                feedback: "Hai hạt nhân cùng Z = 6. Với N = A − Z, hạt nhân có A lớn hơn sẽ có nhiều neutron hơn."
            },
            {
                text: "C-14 nhiều hơn 8 neutron.",
                feedback: "8 là số neutron của C-14, chưa phải độ chênh lệch. Em hãy tính thêm N của C-12."
            },
            {
                text: "Bằng nhau, vì cùng là carbon.",
                feedback: "Cùng là carbon nghĩa là cùng số proton Z, không phải cùng số neutron."
            }
        ],
        explanation: "C-12: N = 12 − 6 = 6. C-14: N = 14 − 6 = 8. C-14 nhiều hơn 8 − 6 = 2 neutron."
    },

    "ns-kp-3": {
        options: [
            {
                text: "Vì chúng có cùng số proton Z = 92 nhưng khác số neutron.",
                correct: true
            },
            {
                text: "Vì chúng có cùng số khối A.",
                feedback: "Số khối của hai hạt nhân khác nhau: 235 và 238."
            },
            {
                text: "Vì chúng có cùng số neutron N.",
                feedback: "Em hãy tính N = A − Z cho từng hạt nhân rồi so sánh."
            },
            {
                text: "Vì cả hai đều là chất phóng xạ.",
                feedback: "Tính phóng xạ không quyết định một hạt nhân thuộc nguyên tố nào. Đại lượng quyết định là Z."
            }
        ],
        explanation: "Nguyên tố được xác định bởi số proton Z. Cả hai đều có Z = 92 nên đều là uranium. Số neutron khác nhau (143 và 146) nên số khối khác nhau."
    },

    "ns-kp-4": {
        options: [
            { text: "Số proton Z.", correct: true },
            {
                text: "Số neutron N.",
                feedback: "Trong mỗi cặp, số khối A khác nhau. Em hãy so sánh N = A − Z của hai hạt nhân."
            },
            {
                text: "Số khối A.",
                feedback: "Số khối là con số ghi sau tên nguyên tố, ví dụ 59 và 60. Hai số này khác nhau."
            },
            {
                text: "Cả A và N.",
                feedback: "A và N cùng thay đổi một lượng như nhau. Em hãy tìm đại lượng không đổi."
            }
        ],
        explanation: "Mỗi cặp là hai đồng vị của cùng một nguyên tố nên có cùng Z (Co: 27, I: 53, Cs: 55). A và N cùng tăng một lượng như nhau."
    },

    "bridge-explore": {
        options: [
            { text: "Chúng là hai đồng vị của cùng một nguyên tố.", correct: true },
            {
                text: "Chúng thuộc hai nguyên tố khác nhau.",
                feedback: "Nguyên tố được xác định bởi Z. Hai hạt nhân có cùng Z thì thuộc cùng nguyên tố."
            },
            {
                text: "Chúng là cùng một hạt nhân (cùng nuclide).",
                feedback: "Cùng một nuclide thì phải trùng cả Z và A."
            },
            {
                text: "Chúng có cùng số neutron.",
                feedback: "Vì N = A − Z, khi Z giống nhau mà A khác nhau thì N cũng khác nhau."
            }
        ],
        explanation: "Đồng vị là các hạt nhân có cùng số proton Z nhưng khác số neutron N, do đó khác số khối A."
    },

    "bridge-experiment": {
        options: [
            { text: "N tăng 1.", correct: true },
            {
                text: "N giảm 1.",
                feedback: "Từ N = A − Z: khi Z giữ nguyên, A tăng bao nhiêu thì N tăng bấy nhiêu."
            },
            {
                text: "N không đổi.",
                feedback: "A = Z + N. Nếu Z và N cùng không đổi thì A không thể tăng."
            }
        ],
        explanation: "ΔN = ΔA − ΔZ = 1 − 0 = 1. Hạt nhân có thêm một neutron, ví dụ C-12 → C-13."
    }
});

QuickCheck.mountAll();
