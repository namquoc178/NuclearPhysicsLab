// questions.js – Bài 7: đáp án và phản hồi cho các câu hỏi có kiểm tra.

QuickCheck.define({
    "fi-kp-1": {
        options: [
            {
                text: "Vì các nucleon chỉ được chia lại giữa các mảnh và neutron; không nucleon nào mất đi hay sinh thêm.",
                correct: true
            },
            {
                text: "Vì khối lượng được bảo toàn.",
                feedback: "Khối lượng không được bảo toàn: tổng khối lượng sau phản ứng nhỏ hơn trước. Đại lượng được bảo toàn ở đây là số nucleon."
            },
            {
                text: "Vì neutron bắn vào đã biến mất.",
                feedback: "Neutron tới được tính ở vế trái (A = 1) và đi vào hạt nhân U-236 trung gian."
            }
        ],
        explanation: "Ví dụ với kênh trong bài: vế trái 235 + 1 = 236; vế phải 141 + 92 + 3·1 = 236. Proton và neutron không tự sinh ra hay mất đi trong phân hạch."
    },

    "fi-kp-2": {
        options: [
            {
                text: "Vì Q = (m trước − m sau)·c²; phần khối lượng giảm chuyển thành động năng của các sản phẩm.",
                correct: true
            },
            {
                text: "Vì sau phản ứng có nhiều hạt hơn.",
                feedback: "Số hạt không quyết định dấu của Q. Q chỉ phụ thuộc chênh lệch khối lượng hai vế."
            },
            {
                text: "Vì mọi phản ứng hạt nhân đều có Q dương.",
                feedback: "Có những phản ứng có Q < 0: khối lượng sau lớn hơn trước và phản ứng phải nhận năng lượng mới xảy ra."
            }
        ],
        explanation: "Q = (m trước − m sau)·c². Khi m sau < m trước thì Q > 0: phản ứng tỏa năng lượng, chủ yếu dưới dạng động năng của hai mảnh phân hạch."
    },

    "fi-kp-3": {
        options: [
            {
                text: "Hai đỉnh: một quanh A ≈ 95 (mảnh nhẹ), một quanh A ≈ 138 (mảnh nặng).",
                correct: true
            },
            {
                text: "Một đỉnh ở giữa, quanh A ≈ 117, vì hạt nhân thường vỡ đôi đều nhau.",
                feedback: "Em hãy nhìn lại đồ thị ở vùng A ≈ 117: số mảnh ở đó gần như bằng 0."
            },
            {
                text: "Gần như phẳng: mọi số khối từ 70 đến 165 đều có khả năng như nhau.",
                feedback: "Với 10 000 phân hạch, các cột chênh nhau rất rõ. Em hãy so cột cao nhất với cột ở A ≈ 117."
            }
        ],
        explanation: "Phân hạch U-235 bởi neutron nhiệt thường không đối xứng: một mảnh nhẹ (A ≈ 90–100) và một mảnh nặng (A ≈ 133–143). Theo ENDF/B-VIII.0, hiệu suất ở A = 134 lớn gấp khoảng 600 lần ở A = 117. Hai đỉnh đối xứng quanh A ≈ 117 vì tổng số khối của hai mảnh xấp xỉ 236 trừ đi vài neutron."
    },

    "bridge-explore": {
        options: [
            { text: "Tổng số khối A và tổng điện tích Z.", correct: true },
            {
                text: "Tổng khối lượng và tổng năng lượng liên kết.",
                feedback: "Khối lượng không được bảo toàn trong phản ứng hạt nhân; chính phần chênh lệch khối lượng tạo ra Q."
            },
            {
                text: "Số hạt ở vế trái và số hạt ở vế phải.",
                feedback: "Số hạt không phải đại lượng bảo toàn: vế trái có 2 hạt, vế phải có 5 hạt."
            }
        ],
        explanation: "Tổng A (số nucleon) và tổng Z (điện tích) ở hai vế phải bằng nhau. Đây là cách nhanh nhất để phát hiện một phương trình viết sai."
    },

    "bridge-experiment": {
        options: [
            {
                text: "Vì mô hình đã giản lược hình học, xác suất bắt neutron, sự làm chậm neutron và cách điều khiển lò.",
                correct: true
            },
            {
                text: "Vì lò phản ứng thực không dùng U-235.",
                feedback: "Phần lớn lò phản ứng hiện nay dùng nhiên liệu uranium có U-235 được làm giàu vài phần trăm."
            },
            {
                text: "Vì trong lò thực, phân hạch không sinh ra neutron.",
                feedback: "Mỗi phân hạch U-235 sinh ra trung bình khoảng 2,4 neutron; đó chính là cơ sở của phản ứng dây chuyền."
            }
        ],
        explanation: "Mô hình chỉ minh họa ý tưởng: mỗi phân hạch sinh neutron gây ra phân hạch tiếp theo. Lò thực còn có chất làm chậm, thanh điều khiển, neutron trễ và hình học của vùng hoạt."
    }
});

QuickCheck.mountAll();
