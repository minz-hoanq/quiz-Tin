/**
 * QUIZ MASTER – Dữ liệu câu hỏi
 * Nguồn: Đề cương ôn tập giữa kỳ 1 – Tin 12 (2026-2027)
 * Đáp án được xác định theo màu chữ trong tài liệu gốc (đỏ = đúng).
 *
 * Cách thêm câu hỏi: xem README.md
 */

const MCQ_QUESTIONS = [
  {
    id: 1,
    question: "AI (trí tuệ nhân tạo) là gì?",
    options: {
      A: "Là khả năng lưu trữ và truyền dữ liệu của máy tính.",
      B: "Là khả năng của máy tính thực hiện các công việc mang tính trí tuệ của con người.",
      C: "Là khả năng kết nối các thiết bị trong mạng máy tính.",
      D: "Là khả năng tăng tốc độ xử lí của bộ vi xử lí.",
    },
    answer: "B"
  },
  {
    id: 2,
    question: "Mục đích của việc phát triển các ứng dụng AI là gì?",
    options: {
      A: "Tăng dung lượng lưu trữ của máy tính.",
      B: "Tăng tốc độ kết nối mạng Internet.",
      C: "Xây dựng các phần mềm giúp máy tính có được những năng lực trí tuệ tương tự con người.",
      D: "Thay thế hoàn toàn các thiết bị phần cứng của máy tính.",
    },
    answer: "C"
  },
  {
    id: 3,
    question: "Khả năng nào của AI cho phép máy tính nắm bắt thông tin từ dữ liệu và điều chỉnh hành vi dựa trên thông tin mới?",
    options: {
      A: "Khả năng học.",
      B: "Khả năng suy luận.",
      C: "Khả năng nhận thức.",
      D: "Khả năng kết nối.",
    },
    answer: "A"
  },
  {
    id: 4,
    question: "Hệ chuyên gia MYCIN là một ứng dụng của AI trong lĩnh vực nào?",
    options: {
      A: "Giáo dục.",
      B: "Giao thông vận tải.",
      C: "Giải trí.",
      D: "Y học.",
    },
    answer: "D"
  },
  {
    id: 5,
    question: "AI được ứng dụng trong lĩnh vực y học nhằm mục đích nào sau đây?",
    options: {
      A: "Thay thế hoàn toàn bác sĩ trong mọi hoạt động khám chữa bệnh.",
      B: "Hỗ trợ phân tích hình ảnh y tế, chẩn đoán và định hướng điều trị.",
      C: "Chỉ quản lí hồ sơ học tập của bệnh nhân.",
      D: "Chỉ thực hiện việc thanh toán viện phí.",
    },
    answer: "B"
  },
  {
    id: 6,
    question: "Trong lĩnh vực giao thông vận tải, AI được ứng dụng để phát triển sản phẩm nào sau đây?",
    options: {
      A: "Máy in văn phòng.",
      B: "Phần mềm soạn thảo văn bản.",
      C: "Thiết bị lưu trữ dữ liệu.",
      D: "Phương tiện tự lái và hệ thống quản lí giao thông thông minh.",
    },
    answer: "D"
  },
  {
    id: 7,
    question: "Trong lĩnh vực tài chính, ngân hàng, AI có thể được sử dụng để thực hiện công việc nào sau đây?",
    options: {
      A: "Tự động hóa việc cập nhật chứng từ, hóa đơn vào cơ sở dữ liệu.",
      B: "Thay thế hoàn toàn hệ thống mạng máy tính.",
      C: "Chỉ thiết kế các thiết bị phần cứng.",
      D: "Chỉ tạo lập các trang trình chiếu.",
    },
    answer: "A"
  },
  {
    id: 8,
    question: "Trong lĩnh vực sản xuất, AI có thể hỗ trợ công việc nào sau đây?",
    options: {
      A: "Chỉ nhập dữ liệu bằng bàn phím.",
      B: "Chỉ trình bày văn bản.",
      C: "Tự động hóa các quá trình chế tạo, lắp ráp và cung ứng.",
      D: "Chỉ lưu trữ tệp văn bản.",
    },
    answer: "C"
  },
  {
    id: 9,
    question: "Hệ chuyên gia là chương trình máy tính được xây dựng dựa trên yếu tố nào sau đây?",
    options: {
      A: "Chỉ dựa trên hình ảnh và âm thanh.",
      B: "Chỉ dựa trên các thiết bị ngoại vi.",
      C: "Luật suy diễn và tri thức của chuyên gia trong một lĩnh vực cụ thể.",
      D: "Chỉ dựa trên dung lượng bộ nhớ của máy tính.",
    },
    answer: "C"
  },
  {
    id: 10,
    question: "Một trong những nguy cơ của sự phát triển trí tuệ nhân tạo đối với việc làm là gì?",
    options: {
      A: "Tất cả các ngành nghề đều phải ngừng hoạt động.",
      B: "Máy tính không thể lưu trữ dữ liệu.",
      C: "Mọi công việc đều cần nhiều lao động hơn.",
      D: "Một số người lao động có thể mất việc làm do tự động hóa.",
    },
    answer: "D"
  },
  {
    id: 11,
    question: "Nguy cơ nào sau đây liên quan đến quyền riêng tư khi sử dụng AI?",
    options: {
      A: "Tăng dung lượng ổ cứng máy tính.",
      B: "Dữ liệu cá nhân có thể bị thu thập hoặc sử dụng không phù hợp.",
      C: "Tăng tốc độ xử lí của bộ vi xử lí.",
      D: "Cải thiện chất lượng hình ảnh hiển thị.",
    },
    answer: "B"
  },
  {
    id: 12,
    question: "Khả năng thiếu minh bạch của AI có thể gây ra khó khăn nào sau đây?",
    options: {
      A: "Không thể kết nối máy tính với máy in.",
      B: "Không thể lưu trữ dữ liệu trên máy tính.",
      C: "Khó giải thích nguyên nhân AI đưa ra một kết quả hoặc quyết định.",
      D: "Không thể sử dụng bàn phím để nhập dữ liệu.",
    },
    answer: "C"
  },
  {
    id: 13,
    question: "Thiết bị nào sau đây được sử dụng để kết nối các máy tính trong mạng LAN và chuyển dữ liệu đến đúng thiết bị nhận?",
    options: {
      A: "Modem.",
      B: "Switch.",
      C: "Máy in.",
      D: "Máy quét.",
    },
    answer: "B"
  },
  {
    id: 14,
    question: "Thiết bị nào sau đây có chức năng kết nối các mạng máy tính khác nhau và định tuyến các gói tin giữa chúng?",
    options: {
      A: "Switch.",
      B: "Access Point.",
      C: "Router.",
      D: "Webcam.",
    },
    answer: "C"
  },
  {
    id: 15,
    question: "Thiết bị nào sau đây cho phép các thiết bị không dây kết nối vào mạng máy tính?",
    options: {
      A: "Máy in.",
      B: "Switch.",
      C: "Modem.",
      D: "Access Point.",
    },
    answer: "D"
  },
  {
    id: 16,
    question: "Thiết bị nào sau đây thường được sử dụng để chuyển đổi tín hiệu, giúp kết nối mạng nội bộ với đường truyền Internet của nhà cung cấp dịch vụ?",
    options: {
      A: "Modem.",
      B: "Bàn phím.",
      C: "Máy chiếu.",
      D: "Máy quét.",
    },
    answer: "A"
  },
  {
    id: 17,
    question: "Giao thức mạng là gì?",
    options: {
      A: "Là thiết bị dùng để kết nối các máy tính trong mạng.",
      B: "Là tập hợp các quy tắc quy định cách các thiết bị trao đổi dữ liệu trong mạng.",
      C: "Là phần mềm dùng để soạn thảo văn bản.",
      D: "Là thiết bị dùng để lưu trữ dữ liệu.",
    },
    answer: "B"
  },
  {
    id: 18,
    question: "Giao thức TCP/IP được sử dụng chủ yếu trong mạng nào sau đây?",
    options: {
      A: "Mạng truyền hình cáp.",
      B: "Mạng điện thoại nội bộ.",
      C: "Mạng máy tính không có kết nối với nhau.",
      D: "Internet.",
    },
    answer: "D"
  },
  {
    id: 19,
    question: "Giao thức HTTP được sử dụng chủ yếu để làm gì?",
    options: {
      A: "Truyền thư điện tử giữa các máy chủ.",
      B: "Truyền tải dữ liệu giữa trình duyệt web và máy chủ web.",
      C: "Cấp phát địa chỉ IP tự động cho thiết bị.",
      D: "Truyền tệp qua mạng bằng giao thức FTP.",
    },
    answer: "B"
  },
  {
    id: 20,
    question: "Giao thức DNS có chức năng gì?",
    options: {
      A: "Mã hóa dữ liệu trên ổ cứng.",
      B: "Truyền tải thư điện tử.",
      C: "Phân giải tên miền thành địa chỉ IP tương ứng.",
      D: "Kết nối máy tính với máy in.",
    },
    answer: "C"
  },
  {
    id: 21,
    question: "Chia sẻ tài nguyên trên mạng máy tính là gì?",
    options: {
      A: "Chỉ lưu trữ dữ liệu trên máy tính cá nhân.",
      B: "Cho phép các máy tính trong mạng cùng truy cập và sử dụng tài nguyên được chia sẻ.",
      C: "Ngắt kết nối các máy tính trong mạng.",
      D: "Xóa dữ liệu trên các máy tính trong mạng.",
    },
    answer: "B"
  },
  {
    id: 22,
    question: "Tài nguyên nào sau đây có thể được chia sẻ trên mạng máy tính?",
    options: {
      A: "Chỉ bộ vi xử lí của máy tính.",
      B: "Chỉ bộ nhớ RAM của máy tính.",
      C: "Chỉ màn hình máy tính.",
      D: "Tệp dữ liệu và thư mục.",
    },
    answer: "D"
  },
  {
    id: 23,
    question: "Khi chia sẻ một thư mục trên mạng máy tính, người dùng có thể thiết lập quyền truy cập nào sau đây?",
    options: {
      A: "Quyền tăng tốc độ xử lí của máy tính.",
      B: "Quyền đọc và quyền ghi dữ liệu.",
      C: "Quyền thay đổi cấu hình phần cứng từ xa trong mọi trường hợp.",
      D: "Quyền tự động tăng dung lượng ổ cứng.",
    },
    answer: "B"
  },
  {
    id: 24,
    question: "Vì sao cần thiết lập quyền truy cập khi chia sẻ tài nguyên trên mạng?",
    options: {
      A: "Để tăng kích thước tệp dữ liệu.",
      B: "Để tăng tốc độ của bộ vi xử lí.",
      C: "Để kiểm soát việc truy cập và bảo vệ tài nguyên được chia sẻ.",
      D: "Để ngắt kết nối Internet của máy tính.",
    },
    answer: "C"
  },
  {
    id: 25,
    question: "Không gian mạng là gì?",
    options: {
      A: "Môi trường chỉ dùng để trao đổi thư điện tử.",
      B: "Môi trường được tạo ra nhờ các mạng máy tính.",
      C: "Môi trường chỉ dành cho việc lưu trữ dữ liệu.",
      D: "Môi trường chỉ hoạt động trong mạng nội bộ.",
    },
    answer: "B"
  },
  {
    id: 26,
    question: "Đâu là một ưu điểm của giao tiếp trong không gian mạng?",
    options: {
      A: "Thiếu tín hiệu phi ngôn ngữ.",
      B: "Có nguy cơ mất an toàn thông tin.",
      C: "Khó xây dựng mối quan hệ chặt chẽ.",
      D: "Tiết kiệm thời gian và chi phí.",
    },
    answer: "D"
  },
  {
    id: 27,
    question: "Đâu là một nhược điểm của giao tiếp trong không gian mạng?",
    options: {
      A: "Mở rộng kết nối xã hội.",
      B: "Thiếu tín hiệu phi ngôn ngữ.",
      C: "Công cụ giao tiếp đa dạng.",
      D: "Thuận tiện trong trao đổi thông tin.",
    },
    answer: "B"
  },
  {
    id: 28,
    question: "Đâu là một nguy cơ khi giao tiếp trong không gian mạng?",
    options: {
      A: "Tiết kiệm thời gian trao đổi.",
      B: "Mở rộng phạm vi kết nối.",
      C: "Mất an toàn thông tin và quyền riêng tư.",
      D: "Sử dụng được nhiều công cụ giao tiếp.",
    },
    answer: "C"
  },
  {
    id: 29,
    question: "Hành vi nào sau đây thể hiện tính nhân văn khi giao tiếp trong không gian mạng?",
    options: {
      A: "Đăng tải thông tin cá nhân của người khác khi chưa được phép.",
      B: "Sử dụng ngôn ngữ xúc phạm người khác.",
      C: "Tôn trọng ý kiến và quyền riêng tư của người khác.",
      D: "Chia sẻ thông tin chưa được kiểm chứng.",
    },
    answer: "C"
  },
  {
    id: 30,
    question: "Trước khi chia sẻ một thông tin trên không gian mạng, người dùng nên làm gì?",
    options: {
      A: "Chia sẻ ngay để nhiều người biết.",
      B: "Chỉ xem số lượt thích của bài viết.",
      C: "Chia sẻ nếu thông tin được nhiều người đăng lại.",
      D: "Kiểm tra tính chính xác của thông tin.",
    },
    answer: "D"
  },
  {
    id: 31,
    question: "Khi đọc bài viết của người khác trên không gian mạng, chúng ta nên làm gì trước khi đưa ra ý kiến?",
    options: {
      A: "Phản đối ngay lập tức.",
      B: "Đọc kĩ nội dung để hiểu rõ và tránh hiểu lầm.",
      C: "Chia sẻ bài viết mà không cần đọc.",
      D: "Đưa ra nhận xét khi chưa hiểu nội dung.",
    },
    answer: "B"
  },
  {
    id: 32,
    question: "Khi gặp ý kiến trái chiều trong giao tiếp trên không gian mạng, cách ứng xử nào sau đây là phù hợp?",
    options: {
      A: "Dùng lời lẽ xúc phạm người có ý kiến khác.",
      B: "Đăng thông tin cá nhân của người đó.",
      C: "Kêu gọi người khác công kích người đó.",
      D: "Bình tĩnh trao đổi và tôn trọng ý kiến của người khác.",
    },
    answer: "D"
  },
  {
    id: 33,
    question: "Vì sao một hệ thống nhận dạng giọng nói được xem là ứng dụng của trí tuệ nhân tạo?",
    options: {
      A: "Vì hệ thống có thể lưu trữ các tệp âm thanh.",
      B: "Vì hệ thống có thể kết nối với Internet.",
      C: "Vì hệ thống có thể phân tích giọng nói và nhận dạng nội dung lời nói của con người.",
      D: "Vì hệ thống có thể phát âm thanh qua loa.",
    },
    answer: "C"
  },
  {
    id: 34,
    question: "Một phần mềm có khả năng học từ dữ liệu để cải thiện kết quả dự đoán. Đặc điểm này thể hiện khả năng nào của trí tuệ nhân tạo?",
    options: {
      A: "Khả năng lưu trữ dữ liệu.",
      B: "Khả năng học.",
      C: "Khả năng hiển thị thông tin.",
      D: "Khả năng kết nối thiết bị.",
    },
    answer: "B"
  },
  {
    id: 35,
    question: "Điểm khác biệt cơ bản giữa một chương trình máy tính thông thường chỉ thực hiện các lệnh cố định và một hệ thống AI có khả năng học là gì?",
    options: {
      A: "Chương trình thông thường không thể xử lí dữ liệu.",
      B: "Hệ thống AI không cần dữ liệu đầu vào.",
      C: "Chương trình thông thường luôn cần kết nối Internet.",
      D: "Hệ thống AI có thể sử dụng dữ liệu để học và cải thiện kết quả thực hiện nhiệm vụ.",
    },
    answer: "D"
  },
  {
    id: 36,
    question: "Một ứng dụng có thể nhận diện khuôn mặt trong ảnh để xác định người dùng. Khả năng nào của trí tuệ nhân tạo được thể hiện rõ nhất trong tình huống này?",
    options: {
      A: "Khả năng lưu trữ dữ liệu hình ảnh.",
      B: "Khả năng truyền dữ liệu qua mạng.",
      C: "Khả năng nhận biết và xử lí hình ảnh.",
      D: "Khả năng điều khiển thiết bị nhập dữ liệu.",
    },
    answer: "C"
  },
  {
    id: 37,
    question: "Vì sao trí tuệ nhân tạo có thể hỗ trợ bác sĩ trong việc chẩn đoán bệnh?",
    options: {
      A: "Vì AI có thể thay thế hoàn toàn kiến thức chuyên môn của bác sĩ.",
      B: "Vì AI có thể tự động chữa khỏi mọi loại bệnh.",
      C: "Vì AI có thể phân tích dữ liệu y tế và hỗ trợ phát hiện dấu hiệu bất thường.",
      D: "Vì AI không cần dữ liệu để đưa ra kết quả chẩn đoán.",
    },
    answer: "C"
  },
  {
    id: 38,
    question: "Vì sao trí tuệ nhân tạo được ứng dụng trong các hệ thống giao thông thông minh?",
    options: {
      A: "Vì AI giúp loại bỏ hoàn toàn mọi tai nạn giao thông.",
      B: "Vì AI có thể phân tích dữ liệu giao thông để hỗ trợ điều tiết phương tiện và tối ưu hóa lộ trình.",
      C: "Vì AI có thể làm cho mọi phương tiện không cần người điều khiển trong mọi tình huống.",
      D: "Vì AI giúp các phương tiện hoạt động mà không cần thiết bị cảm biến.",
    },
    answer: "B"
  },
  {
    id: 39,
    question: "Vì sao việc sử dụng trí tuệ nhân tạo trong sản xuất có thể làm thay đổi nhu cầu lao động?",
    options: {
      A: "Vì AI khiến tất cả các ngành nghề đều biến mất.",
      B: "Vì AI chỉ có thể thực hiện các công việc thủ công.",
      C: "Vì AI không thể thực hiện các công việc lặp đi lặp lại.",
      D: "Vì AI có thể tự động hóa một số công việc, làm giảm nhu cầu nhân lực ở một số vị trí và tạo ra nhu cầu về những kĩ năng mới.",
    },
    answer: "D"
  },
  {
    id: 40,
    question: "Vì sao cần kiểm tra thông tin do hệ thống trí tuệ nhân tạo tạo ra trước khi sử dụng?",
    options: {
      A: "Vì AI không thể xử lí ngôn ngữ tự nhiên.",
      B: "Vì mọi thông tin do AI tạo ra đều sai.",
      C: "Vì AI có thể tạo ra thông tin không chính xác hoặc không phù hợp với thực tế.",
      D: "Vì AI chỉ tạo ra được thông tin dưới dạng hình ảnh.",
    },
    answer: "C"
  },
  {
    id: 41,
    question: "Trong một phòng máy có nhiều máy tính cần kết nối với nhau thành mạng LAN có dây, thiết bị nào phù hợp nhất để kết nối các máy tính này?",
    options: {
      A: "Modem, vì thiết bị này có chức năng lưu trữ dữ liệu của các máy tính.",
      B: "Switch, vì thiết bị này kết nối các thiết bị trong mạng LAN và chuyển dữ liệu đến thiết bị đích.",
      C: "Router, vì thiết bị này có chức năng cấp nguồn điện cho các máy tính.",
      D: "Access Point, vì thiết bị này chỉ kết nối các máy tính bằng cáp mạng.",
    },
    answer: "B"
  },
  {
    id: 42,
    question: "Một gia đình muốn kết nối mạng LAN với Internet và cho phép các thiết bị trong nhà truy cập Internet. Thiết bị nào thực hiện chức năng định tuyến giữa mạng gia đình và các mạng bên ngoài?",
    options: {
      A: "Switch.",
      B: "Máy in mạng.",
      C: "Access Point.",
      D: "Router.",
    },
    answer: "D"
  },
  {
    id: 43,
    question: "Một máy tính xách tay cần kết nối vào mạng nội bộ thông qua Wi-Fi. Thiết bị mạng nào có thể cung cấp kết nối không dây cho máy tính đó?",
    options: {
      A: "Switch thông thường không có chức năng Wi-Fi.",
      B: "Máy chủ tệp.",
      C: "Access Point.",
      D: "Máy in.",
    },
    answer: "C"
  },
  {
    id: 44,
    question: "Vì sao trong một mạng máy tính, router và switch thường đảm nhiệm những chức năng khác nhau?",
    options: {
      A: "Vì switch chỉ dùng để kết nối Internet, còn router chỉ dùng để lưu trữ dữ liệu.",
      B: "Vì switch chủ yếu kết nối các thiết bị trong mạng LAN, còn router chuyển tiếp các gói tin giữa các mạng khác nhau.",
      C: "Vì switch chỉ hoạt động với Wi-Fi, còn router chỉ hoạt động với cáp mạng.",
      D: "Vì switch dùng để cấp địa chỉ IP cho mọi thiết bị, còn router dùng để in tài liệu.",
    },
    answer: "B"
  },
  {
    id: 45,
    question: "Một học sinh muốn các máy tính khác trong mạng LAN có thể truy cập các tài liệu trong một thư mục trên máy tính của mình. Học sinh cần thực hiện thao tác nào?",
    options: {
      A: "Đổi tên thư mục thành tên chung của mạng LAN.",
      B: "Thiết lập chia sẻ thư mục và cấp quyền truy cập phù hợp cho người dùng khác.",
      C: "Sao chép thư mục vào thùng rác của máy tính.",
      D: "Ngắt kết nối máy tính khỏi mạng LAN.",
    },
    answer: "B"
  },
  {
    id: 46,
    question: "Trong quá trình chia sẻ một thư mục trên mạng, người dùng được cấp quyền chỉ đọc có thể thực hiện thao tác nào đối với các tệp trong thư mục đó?",
    options: {
      A: "Đọc, sửa đổi và xóa mọi tệp.",
      B: "Tạo mới và xóa thư mục tùy ý.",
      C: "Thay đổi quyền truy cập của tất cả người dùng.",
      D: "Mở và xem nội dung tệp được phép truy cập nhưng không thể sửa đổi nội dung theo quyền chỉ đọc.",
    },
    answer: "D"
  },
  {
    id: 47,
    question: "Một giáo viên muốn học sinh xem tài liệu trong thư mục dùng chung nhưng không được tự ý sửa hoặc xóa tài liệu. Giáo viên nên thiết lập quyền nào?",
    options: {
      A: "Toàn quyền truy cập.",
      B: "Quyền đọc và ghi.",
      C: "Quyền chỉ đọc.",
      D: "Quyền quản trị máy tính.",
    },
    answer: "C"
  },
  {
    id: 48,
    question: "Vì sao cần hạn chế quyền truy cập khi chia sẻ tài nguyên trên mạng máy tính?",
    options: {
      A: "Để làm tăng dung lượng lưu trữ của máy tính.",
      B: "Để tăng tốc độ xử lí của bộ vi xử lí.",
      C: "Để ngăn người không được phép xem, sửa đổi hoặc xóa dữ liệu dùng chung.",
      D: "Để mọi người dùng đều có quyền quản trị máy tính.",
    },
    answer: "C"
  },
];

const TF_QUESTIONS = [
  {
    id: 1,
    question: "Làm quen với trí tuệ nhân tạo (AI)",
    statements: [
      { id: "a", text: "Trí tuệ nhân tạo là một lĩnh vực của khoa học máy tính nhằm tạo ra các hệ thống có khả năng thực hiện những nhiệm vụ đòi hỏi trí thông minh của con người.", answer: true },
      { id: "b", text: "Trí tuệ nhân tạo chỉ được sử dụng trong lĩnh vực giải trí.", answer: false },
      { id: "c", text: "Hệ thống AI có thể sử dụng dữ liệu để nhận biết mẫu và đưa ra dự đoán.", answer: true },
      { id: "d", text: "Khi sử dụng một ứng dụng AI để tham khảo thông tin, người dùng không cần kiểm tra lại kết quả vì AI luôn đưa ra câu trả lời chính xác.", answer: false },
    ]
  },
  {
    id: 2,
    question: "Khả năng của trí tuệ nhân tạo",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về khả năng của trí tuệ nhân tạo (AI).",
    statements: [
      { id: "a", text: "Nhận dạng giọng nói là một ứng dụng của trí tuệ nhân tạo.", answer: true },
      { id: "b", text: "Hệ thống nhận dạng khuôn mặt chỉ có thể hoạt động khi con người nhập thủ công tên của từng người vào máy tính.", answer: false },
      { id: "c", text: "Một hệ thống AI được huấn luyện bằng dữ liệu phù hợp có thể nhận biết các đặc điểm chung để phân loại hình ảnh.", answer: true },
      { id: "d", text: "Khi ứng dụng AI nhận dạng sai một khuôn mặt, người quản lí vẫn nên sử dụng kết quả đó để đưa ra quyết định mà không cần kiểm tra lại.", answer: false },
    ]
  },
  {
    id: 3,
    question: "Ứng dụng trí tuệ nhân tạo trong thực tiễn",
    statements: [
      { id: "a", text: "AI có thể được ứng dụng trong lĩnh vực y tế để hỗ trợ phân tích hình ảnh y khoa.", answer: true },
      { id: "b", text: "AI có thể được ứng dụng trong giao thông để hỗ trợ phân tích tình hình giao thông.", answer: true },
      { id: "c", text: "AI có thể hỗ trợ bác sĩ phát hiện dấu hiệu bất thường trên ảnh y khoa, nhưng kết quả cần được chuyên gia xem xét và đánh giá.", answer: true },
      { id: "d", text: "Một bệnh nhân nhận được kết quả gợi ý bệnh từ ứng dụng AI nên tự mua thuốc điều trị ngay mà không cần tham khảo ý kiến nhân viên y tế.", answer: false },
    ]
  },
  {
    id: 4,
    question: "Một số thiết bị mạng thông dụng",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về chức năng của các thiết bị mạng.",
    statements: [
      { id: "a", text: "Switch là thiết bị dùng để kết nối các thiết bị trong cùng một mạng LAN.", answer: true },
      { id: "b", text: "Modem có chức năng chính là cấp quyền đọc và ghi tệp tin cho người dùng trong mạng.", answer: false },
      { id: "c", text: "Router có thể được sử dụng để kết nối các mạng khác nhau và chuyển tiếp dữ liệu giữa chúng.", answer: true },
      { id: "d", text: "Khi muốn kết nối máy tính với mạng không dây Wi-Fi, người dùng chỉ cần sử dụng switch thông thường mà không cần thiết bị hỗ trợ Wi-Fi.", answer: false },
    ]
  },
  {
    id: 5,
    question: "Chức năng của Router và Access Point",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về chức năng của router và access point.",
    statements: [
      { id: "a", text: "Access Point là thiết bị cho phép các thiết bị không dây kết nối vào mạng.", answer: true },
      { id: "b", text: "Router chỉ có chức năng kết nối các máy tính bằng cáp mạng trong cùng một mạng LAN, không thể kết nối các mạng khác nhau.", answer: false },
      { id: "c", text: "Trong mạng gia đình, access point có thể giúp điện thoại và máy tính xách tay kết nối mạng thông qua Wi-Fi.", answer: true },
      { id: "d", text: "Khi cần mở rộng vùng phủ sóng Wi-Fi, người dùng nên chọn một switch thông thường vì switch có chức năng phát sóng Wi-Fi.", answer: false },
    ]
  },
  {
    id: 6,
    question: "Lựa chọn thiết bị mạng phù hợp",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về việc lựa chọn thiết bị mạng trong thực tế.",
    statements: [
      { id: "a", text: "Switch thường được sử dụng để kết nối nhiều thiết bị có dây trong mạng LAN.", answer: true },
      { id: "b", text: "Modem có thể được sử dụng để kết nối mạng của người dùng với đường truyền dịch vụ Internet, tùy theo công nghệ kết nối.", answer: false },
      { id: "c", text: "Khi cần kết nối các mạng khác nhau, router phù hợp hơn switch thông thường vì router có chức năng định tuyến gói tin giữa các mạng.", answer: true },
      { id: "d", text: "Một phòng học cần kết nối nhiều máy tính có dây vào cùng mạng LAN. Nhà trường chỉ cần lắp access point vì thiết bị này luôn thay thế được switch trong việc kết nối các máy tính bằng cáp mạng.", answer: false },
    ]
  },
  {
    id: 7,
    question: "Giao thức mạng",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về giao thức mạng.",
    statements: [
      { id: "a", text: "Giao thức mạng là tập hợp các quy tắc quy định cách các thiết bị trao đổi dữ liệu trong mạng.", answer: true },
      { id: "b", text: "Giao thức mạng chỉ quy định cách kết nối các thiết bị bằng dây cáp, không liên quan đến việc trao đổi dữ liệu.", answer: false },
      { id: "c", text: "Các thiết bị cần tuân theo những giao thức tương thích để có thể trao đổi dữ liệu với nhau.", answer: true },
      { id: "d", text: "Hai máy tính sử dụng các giao thức trao đổi dữ liệu không tương thích thì chắc chắn vẫn trao đổi dữ liệu bình thường mà không cần điều chỉnh gì.", answer: false },
    ]
  },
  {
    id: 8,
    question: "Giao thức TCP/IP và HTTP",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về giao thức TCP/IP và HTTP.",
    statements: [
      { id: "a", text: "TCP/IP là bộ giao thức nền tảng được sử dụng phổ biến trong mạng Internet.", answer: true },
      { id: "b", text: "HTTP là giao thức được sử dụng chủ yếu để phân giải tên miền thành địa chỉ IP.", answer: false },
      { id: "c", text: "HTTP được sử dụng để trao đổi dữ liệu giữa trình duyệt web và máy chủ web.", answer: true },
      { id: "d", text: "Khi muốn truy cập một trang web, người dùng phải cài đặt giao thức HTTP riêng trên máy tính thì mới có thể sử dụng trình duyệt web.", answer: false },
    ]
  },
  {
    id: 9,
    question: "Giao thức DNS và ứng dụng thực tế",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về giao thức DNS và việc truy cập Internet.",
    statements: [
      { id: "a", text: "DNS là hệ thống có chức năng phân giải tên miền thành địa chỉ IP.", answer: true },
      { id: "b", text: "DNS là giao thức dùng để mã hóa toàn bộ dữ liệu trao đổi giữa trình duyệt và máy chủ web.", answer: false },
      { id: "c", text: "Nhờ DNS, người dùng có thể truy cập website bằng tên miền thay vì phải nhớ địa chỉ IP của máy chủ.", answer: true },
      { id: "d", text: "Khi không phân giải được tên miền, người dùng nên kết luận ngay rằng máy tính đã hỏng phần cứng và không cần kiểm tra kết nối mạng hay cấu hình DNS.", answer: false },
    ]
  },
  {
    id: 10,
    question: "Giao tiếp và ứng xử trong không gian mạng",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về giao tiếp và ứng xử trong không gian mạng.",
    statements: [
      { id: "a", text: "Không gian mạng là môi trường mà con người có thể trao đổi thông tin, giao tiếp và chia sẻ nội dung thông qua các hệ thống mạng.", answer: true },
      { id: "b", text: "Khi giao tiếp trên mạng, người dùng không cần quan tâm đến thái độ và cảm xúc của người khác.", answer: false },
      { id: "c", text: "Sử dụng ngôn ngữ lịch sự và tôn trọng người khác khi giao tiếp trực tuyến góp phần xây dựng môi trường mạng văn minh.", answer: true },
      { id: "d", text: "Khi không đồng ý với ý kiến của một bạn trên mạng xã hội, em nên dùng lời lẽ xúc phạm để chứng minh mình đúng.", answer: false },
    ]
  },
  {
    id: 11,
    question: "An toàn và trách nhiệm khi tham gia không gian mạng",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về việc bảo vệ thông tin và sử dụng nội dung trên không gian mạng.",
    statements: [
      { id: "a", text: "Thông tin cá nhân cần được bảo vệ khi tham gia các hoạt động trên không gian mạng.", answer: true },
      { id: "b", text: "Mọi thông tin được đăng tải trên Internet đều chính xác và có thể tin tưởng tuyệt đối.", answer: false },
      { id: "c", text: "Kiểm tra nguồn tin trước khi chia sẻ giúp hạn chế việc lan truyền thông tin sai lệch.", answer: true },
      { id: "d", text: "Khi nhận được một tin nhắn yêu cầu cung cấp mật khẩu tài khoản, em nên gửi ngay mật khẩu để tránh bị khóa tài khoản.", answer: false },
    ]
  },
  {
    id: 12,
    question: "Nhận biết và xử lí thông tin trên không gian mạng",
    note: "Xác định tính đúng hoặc sai của các phát biểu sau về việc tiếp nhận và chia sẻ thông tin trên không gian mạng.",
    statements: [
      { id: "a", text: "Người dùng cần tuân thủ quy định của pháp luật khi tham gia các hoạt động trên không gian mạng.", answer: true },
      { id: "b", text: "Khi sử dụng nội dung của người khác trên Internet, người dùng luôn được phép sao chép và công bố mà không cần quan tâm đến quyền tác giả.", answer: false },
      { id: "c", text: "Đánh giá thông tin từ nhiều nguồn đáng tin cậy giúp người dùng có cơ sở tốt hơn để xác định độ tin cậy của thông tin.", answer: true },
      { id: "d", text: "Khi thấy một bài đăng chưa rõ nguồn gốc có nội dung gây hoang mang, em nên chia sẻ ngay cho nhiều người trước khi kiểm chứng.", answer: false },
    ]
  },
];

// Cho phép app.js đọc dữ liệu (kể cả khi mở bằng file://)
window.MCQ_QUESTIONS = MCQ_QUESTIONS;
window.TF_QUESTIONS = TF_QUESTIONS;
