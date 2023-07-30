init npm project: npm init --yes
option --yes: tự trả lời các câu hỏi khi tạo mới npm project
npm install --save @apollo/server express http cors body-parser

- Để sử dụng await mà không cần async -> sửa js thành mjs

- Khi làm việc graphQL:

  - resolver : Xử lý dữ liệu và trả về dữ liệu từ client dựa theo query mà client gửi tới
  - schema : Giống như document mô tã dữ liệu bao gồm những gì
    có 3 loại type :

  * Query: truy vấn dữ liệu từ client
  * Mutation: update hay là xoá dữ liệu nào đó
  * Subscription: hoạt động phía client update theo dạng real-time

- Trong resolver có 4 tham số

  - parent
  - args: Những dữ liệu từ client gửi lên
  - context
  - info

  === React
  npm install --save react-router-dom
  install material: @mui/material @emotion/react @emotion/styled
  npm install --save @fontsource/roboto
  cài icon từ material: npm install --save @mui/icons-material
  cài đặt thư viện editor: npm i --save react-draft-wysiwyg draft-js draftjs-to-html
