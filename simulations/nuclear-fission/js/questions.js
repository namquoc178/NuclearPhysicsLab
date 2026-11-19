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
                text: "Hai đỉnh: một quanh A ≈ 95 (mảnh nhẹ), một quanh A ≈ 134 (mảnh nặng).",
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

    "fi-tn4-du-doan": {
        predict: true,
        options: [
            {
                text: "Hai mảnh gần bằng nhau, mỗi mảnh có A ≈ 117.",
                feedback: "Em hãy nhìn cột “A = 112–122” của loạt 10 000 phân hạch: vùng này chỉ chiếm chưa tới 0,1 % số mảnh."
            },
            {
                text: "Thường có một mảnh nhẹ (A ≈ 90–100) và một mảnh nặng (A ≈ 130–145).",
                correct: true
            },
            {
                text: "Luôn là Ba-141 và Kr-92 như trong phần hoạt hình.",
                feedback: "Ba-141 + Kr-92 chỉ là một trong rất nhiều cặp mảnh có thể xuất hiện. Em hãy xem các dòng trong bảng: mỗi loạt cho phân bố trải rộng trên nhiều số khối."
            },
            {
                text: "Mọi số khối từ 70 đến 165 đều có khả năng như nhau.",
                feedback: "Với 10 000 phân hạch, các cột trên đồ thị chênh nhau hàng trăm lần. Em hãy so cột cao nhất với cột ở A ≈ 117."
            }
        ],
        explanation: "Phân hạch U-235 bởi neutron nhiệt thường không đối xứng: một mảnh nhẹ quanh A ≈ 95 và một mảnh nặng quanh A ≈ 134–139. Đồ thị số khối vì thế có hai đỉnh và một vùng trũng sâu ở giữa (A ≈ 117)."
    },

    "fi-tn4-1": {
        options: [
            {
                text: "Mỗi phân hạch xảy ra ngẫu nhiên. Với ít lần, số mảnh ở mỗi số khối quá nhỏ nên thăng giáng che mất quy luật; với nhiều lần, tỉ lệ ở mỗi số khối tiến gần tới xác suất của nó.",
                correct: true
            },
            {
                text: "Vì quy luật phân bố thay đổi theo số lần phân hạch.",
                feedback: "Xác suất xuất hiện của mỗi cặp mảnh là như nhau ở mọi loạt. Thứ thay đổi theo số lần phân hạch là độ thăng giáng của kết quả."
            },
            {
                text: "Vì loạt 10 phân hạch dùng một mô hình khác, đơn giản hơn.",
                feedback: "Cả ba loạt dùng cùng một cách rút ngẫu nhiên. Em hãy chạy lại loạt 10 phân hạch vài lần và so các dòng trong bảng."
            }
        ],
        explanation: "Ở A = 134, mỗi mảnh có xác suất khoảng 3,9 %. Loạt 10 phân hạch có 20 mảnh, trung bình chưa tới 1 mảnh rơi vào A = 134. Loạt 10 000 phân hạch có khoảng 785 mảnh ở A = 134, sai lệch ngẫu nhiên cỡ √785 ≈ 28 mảnh, tức khoảng 3,6 %. Đây là cùng một ý như ở Bài 4: với ít hạt nhân, số hạt nhân còn lại lệch nhiều khỏi đường e^(−λt); với rất nhiều hạt nhân, kết quả bám sát quy luật."
    },

    "fi-tn4-2": {
        options: [
            {
                text: "Phân hạch đối xứng rất hiếm: vùng A = 112–122 chỉ chiếm cỡ 0,1 % số mảnh, trong khi vùng A = 90–100 chiếm khoảng một phần ba.",
                correct: true
            },
            {
                text: "Hai vùng có tỉ lệ gần bằng nhau, nên phân hạch đối xứng và không đối xứng thường gặp như nhau.",
                feedback: "Em hãy đọc lại hai cột của loạt 10 000 phân hạch: tỉ lệ ở vùng A = 90–100 lớn hơn vùng A = 112–122 hàng trăm lần."
            },
            {
                text: "Phân hạch đối xứng không bao giờ xảy ra.",
                feedback: "Phân hạch đối xứng vẫn xảy ra, chỉ là rất hiếm. Nếu em chạy thêm vài loạt 10 000 phân hạch, thỉnh thoảng sẽ có mảnh ở vùng A = 112–122."
            }
        ],
        explanation: "Theo ENDF/B-VIII.0, hiệu suất ở A = 134 là khoảng 7,8 %, còn ở A = 117 chỉ khoảng 0,013 %, nhỏ hơn khoảng 600 lần. Vùng A = 90–100 chiếm khoảng 34 % số mảnh, vùng A = 112–122 chỉ khoảng 0,07 %. Giải thích vì sao hạt nhân ưa vỡ không đối xứng cần đến mô hình lớp vỏ của hạt nhân, nằm ngoài chương trình lớp 12."
    },

    "fi-tn4-3": {
        options: [
            {
                text: "Mỗi cặp mảnh có tổng khối lượng khác nhau nên độ hụt khối và Q khác nhau. Lấy trung bình trên rất nhiều phân hạch thì các chênh lệch ngẫu nhiên bù trừ nhau.",
                correct: true
            },
            {
                text: "Vì trong một số phân hạch, số nucleon không được bảo toàn.",
                feedback: "Tổng A và tổng Z luôn được bảo toàn trong mọi phân hạch. Điều thay đổi giữa các lần là tổng khối lượng của các sản phẩm."
            },
            {
                text: "Vì Q phụ thuộc vào tốc độ của neutron bắn vào.",
                feedback: "Trong mô phỏng, neutron tới luôn là neutron nhiệt. Q khác nhau là do mỗi lần sinh ra một cặp mảnh khác nhau."
            }
        ],
        explanation: "Q = (m trước − m sau)·c², mà m sau phụ thuộc cặp mảnh và số neutron phát ra. Trong mô phỏng, Q của từng phân hạch thường nằm trong khoảng 163–198 MeV, nhưng trung bình của 10 000 phân hạch chỉ dao động cỡ 0,1 MeV giữa các loạt, quanh 180 MeV."
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
