<template>
  <div class="news-detail-wrapper">
    <transition name="fade">
      <div class="sticky-box" id="sticky-box" v-show="scY">
        <div class="triangle" @click="upVote"></div>
        <span>22</span>

        <div class="triangle-down" @click="unVote"></div>

        <div class="avt-user">
          <img src="../../../assets/Icon/avt-cattoon.png" alt="" />
        </div>
        <div class="add-wish-list" @click="addWishList">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
            <path
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
        </div>
        <div class="go-to-cmt" @click="goToCmtBox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
            <path
              d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
            />
          </svg>
          <span>2</span>
        </div>
        <button class="button-to-top" id="sticky-box" @click="toTop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-blue_2">
            <path
              d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
            />
          </svg>
        </button>
      </div>
    </transition>
    <div class="news-content__box">
      <div class="news-category text-dark-gray">Chuyện trò - Tâm sự</div>
      <div class="news-name">
        <h1>Bị bắt nạt ở nơi làm việc</h1>
      </div>
      <div class="news-short-des text-dark-gray">Tôi là một nạn nhân bị bắt nạt ở nơi tôi làm việc.</div>
      <div class="news-auth">
        <img src="../../../assets/Icon/avt-cattoon.png" alt="" />
        <div>
          <div class="news-auth_name">longtran9109</div>
          <div class="news-date">14 thang 10</div>
        </div>
      </div>
      <div class="news-content">
        Tôi không nghĩ có ngày mình sẽ nói ra câu này, nhưng tôi là một nạn nhân bị bắt nạt ở nơi tôi làm việc. Chuyện
        này xảy ra trong thời gian 2 tháng gần đây khi tôi xin nghỉ việc. Khi tôi lần đầu gửi email báo với một cấp trên
        trực tiếp (cũng là một giáo viên) về việc có ý định xin nghỉ, người cấp trên đó đã gọi điện cho tôi và mắng tôi
        không thương tiếc. Cô nói rằng cô rất thất vọng về tôi, rằng suốt 6 năm làm việc cùng tôi cô thấy tôi không làm
        được một cái gì cho đơn vị, rằng tôi chỉ tạo gánh nặng cho những người khác. Cô cảm thấy tôi là một người trẻ
        không đủ cam kết và có thái độ không tốt trong công việc. Tôi khuyên tôi cần thay đổi thái độ đó đi. Tôi thực sự
        sốc không nói nên lời khi nghe những lời cô nói. Tôi biết bản thân còn nhiều thiếu sót, nhưng trong công việc
        tôi luôn cố gắng hoàn thành hết mức có thể. Đôi lúc tôi có quên deadline nộp giấy tờ vì không kiểm tra email kịp
        thời, nhưng tôi chắc chắn đảm bảo mình hoàn thành những nhiệm vụ được giao trong khả năng của mình. Tôi biết
        việc tôi muốn rời đi khiến cấp trên này gặp khó khăn khi sắp xếp nhân sự, nhưng tôi đã xin lỗi cô trong email và
        cố gắng báo trước 3 tháng tính đến thời điểm tôi định nghỉ. Nhưng chỉ vì không hài lòng với việc tôi nghỉ, cô
        sẵn sàng gạt hết mọi đóng góp của tôi tại nơi làm việc tôi gắn bó gần 6 năm thì thực sự quá đáng. Cô cũng không
        cho tôi cơ hội giải thích và bắt đầu có thái độ hành động bắt nạt tôi ra mặt. Trong một cuộc họp sau đó, cô cố
        tình nói với nhóm giáo viên trẻ chúng tôi rằng đừng ảo tưởng rời khỏi trường thì có gì tốt đẹp hơn, rằng ở
        trường này là nơi tốt nhất và nhân đạo nhất rồi. Ra xã hội kia chúng tôi sẽ chỉ gặp toàn khó khăn và trở ngại mà
        thôi. Tôi biết cô đang nhắm tới tôi khi nói vậy. Một lần khác, trong một buổi chấm thi, trước mặt cả tổ hơn 20
        người, cô lớn tiếng "đùa" bắt tôi phải khao mọi người ở để để "phạt" cái tội 6 năm "chưa làm được gì mà đã đi".
        Trong lời nói đùa đó có rất rõ ý công kích, nhưng tôi chỉ cúi đầu làm việc của mình không muốn nói gì. Thấy vậy,
        cô tiếp tục lấn tới. Khi những người khác hỏi tôi có ý định làm gì tiếp theo, cô ngay lập tức chen vào và bảo
        "Đi lấy chồng cho xong chứ còn làm gì nữa!" rồi cười hô hố. Mọi người xung quanh cũng cười hùa theo, và lúc đó
        tôi chỉ trả lời yếu ớt rằng tôi sẽ đi học gì đó. Thực sự, lúc đó tôi suýt đã trào nước mắt trước tất cả mọi
        người, nhưng tôi kìm được bằng cách cúi gằm xuống và làm tiếp. Không chỉ vậy, cô vẫn không buông tha cho tôi.
        Cuối buổi, sau khi chấm thi xong phần của mình và đã qua phần chấm phản biện, tôi mang lên nộp cho cô cấp trên
        duyệt lần cuối. Bình thường cô sẽ chỉ kiểm đếm và ký tên rồi cho người chấm về. Nhưng đến lượt tôi, cô giữ bài
        tôi lại, cố tình giở lại bài và bảo cô thấy nghi ngờ điểm tôi đã chấm. Vì vậy cô lôi bài ra chấm lại và bảo tôi
        không được phép về. Dù tôi ngồi đợi, nhưng cô cố tình không chấm lại bài của tôi mà cho những người khác ký về
        và mặc kệ tôi ngồi đợi. Tôi thực sự kinh ngạc vì sự lật mặt của người cấp trên này. Trước đó, cô luôn cố gắng
        tạo hình ảnh mình là một người giàu tình cảm và yêu thương tất cả mọi người. Cô còn ăn chay trường, thường xuyên
        đi làm từ thiện và là người tu tại gia theo đạo Phật. Nhưng tôi hiểu trong những lúc đặc biệt, con người mới thể
        hiện bản chất thật nhất của mình. Và cách cô đối xử bất công ra mặt với tôi trong thời gian qua mới phản ánh
        thực nhất con người cô ở đằng sau lớp áo "tu hành ăn chay" kia. Và đương nhiên, tôi bị bắt nạt không chỉ bởi
        người cấp trên đó, mà còn từ 1 đồng nghiệp khác. Người đồng nghiệp này vừa hay là một thân cận của vị cấp trên
        kia. Chị ta vốn chỉ hơn tôi vài tuổi, nhưng vì được cấp trên ưu ái xếp vị trí tốt nên chị ta thường ỷ vào đó để
        đe nẹt tôi và những người khác. Có lần tôi tham gia 1 dự án của đơn vị cùng chị ta, chị ta cố tình bảo tôi làm
        thay phần việc của chị ta, nhưng tôi kiên quyết từ chối vì không phải trách nhiệm của mình. Trong những buổi
        chấm thi khi cô cấp trên kia bắt nạt tôi ra mặt, chị ta cũng sẽ hùa theo và bắt tôi chấm thay phần chị ta dù tôi
        không đồng ý. Những lúc như vậy, phải có 1 số bạn bè thân của tôi bên cạnh nói đỡ thì chị ta mới dừng lại. Mỗi
        buổi như vậy về, tôi thường cảm thấy rất tồi tệ và tâm trạng đi xuống. Tôi biết cách họ đối xử với tôi là không
        đúng, là một hình thức bắt nạt nơi công sở. Họ lạm dụng quyền lực của mình để bắt nạt, hạ thấp giá trị của tôi,
        muốn tôi cảm thấy tệ hại, xấu hổ về bản thân và quyết định nghỉ việc của mình. Nhưng họ đã lầm. Tôi tin rằng
        cách một người đối xử với ta nói lên nhiều điều về họ hơn là về chính ta. Tôi bị đối xử như vậy không phải vì
        tôi thấp kém và đáng bị đối xử như vậy. Tôi bị đối xử như vậy vì họ là những người không biết kiểm soát cảm xúc
        và hành vi của mình. Vì họ thiếu sự đồng cảm và không biết cách tôn trọng với người khác. Tôi không phải người
        quá tự tin về bản thân mà bỏ ngoài tai lời nói của người khác. Tôi có đủ khả năng tư duy và phản tư về hành động
        của chính mình để xem mình có gì cần sửa đổi không. Và tôi biết mình đã làm hết khả năng rồi, còn những "tội" mà
        những kẻ bắt nạt kia gán cho tôi là để thoả mãn cái tôi của chính họ. Trong tình huống này, tôi không thể không
        nhớ đến mấy câu hát của Đen Vâu trong bài Một triệu like "Vì trò đời mà, chua như là dưa ghém. Tụi nó thích hạ
        thấp người khác để che đậy cảm giác thua kém." Thực sự chỉ có những người bất an và sợ bị thua kém mới tìm cách
        dìm và đe nẹt người khác như vậy. Và vì thế, họ là những kẻ vừa đáng trách vừa đáng thương. Tôi hiểu điều đó nên
        cũng chẳng muốn so đo với họ. Nhưng tôi sẽ không im lặng và để bỏ qua mọi chuyện dễ dàng. Tôi sẽ không chấp nhận
        việc bản thân tôi bị đối xử bất công như vậy. Vì nếu tôi chấp nhận chuyện đó, thứ nhất tôi có lỗi với chính
        mình. Thứ hai, tôi chấp nhận bị bắt nạt cũng đồng nghĩa tôi chấp nhận để những người khác rơi vào tình huống
        giống tôi. Tạm thời tôi đang chờ đợi đơn xin nghỉ được giải quyết. Trong lúc đó, tôi chia sẻ vấn đề của mình với
        một số thầy cô mentor mà tôi tin tưởng xem tôi nên làm gì trong tình huống này. Tôi sẽ có cách phản hồi lại phù
        hợp để người cấp trên và đồng nghiệp kia biết rằng tôi không chấp nhận hành vi bắt nạt của họ và nó cần phải
        dừng lại, dù là với tôi hay với những người khác còn công tác ở đó. Tôi không muốn vội vàng và muốn tìm lời lẽ
        thích hợp để nói lên cảm xúc của mình mà không gây tổn thương và xúc phạm ngược lại hai người đó. Hơn ai hết,
        tôi không muốn họ trải qua cảm xúc mà họ đã mang đến cho tôi. Tôi lên án những hành động của họ, không phải con
        người họ. Và hiện giờ, tôi biết mình cần bình tĩnh và đưa ra cách phản hồi thoả đáng nhất trong chuyện này, để
        xoa dịu những tổn thương bản thân tôi đã phải chịu, không gây thêm tổn thương mới và mang lại những kết quả
        thiết thực cho mọi bên.
      </div>
    </div>
    <div class="manga-cmt" id="cmt">
      <div class="write-cmt-box">
        <textarea
          class="input-cmt"
          type="text"
          placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
          value=""
          v-model="cmt"
        ></textarea>
        <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">Gửi</button>
      </div>
      <div class="cmt-box">
        <Commentfilm></Commentfilm>
        <div class="cmt-rep">
          <Commentfilm></Commentfilm>
          <div class="cmt-rep">
            <Commentfilm></Commentfilm>
          </div>
          <Commentfilm></Commentfilm>
          <div class="cmt-rep">
            <Commentfilm></Commentfilm>
          </div>
        </div>
        <Commentfilm></Commentfilm>
      </div>
    </div>
    <div class="news-relate">
      <div class="relate-title">Bài viết có thể liên quan</div>
      <div class="relate-list">
        <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
        <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
        <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
      </div>
    </div>
  </div>
</template>
<script src="./newDetailView.js"></script>
<style lang="scss" src="./newDetailView.scss" scoped></style>
