<template>
  <div>
    <!-- 封面 -->
    <div class="home-banner" :style="cover">
      <div class="banner-container">
        <h1 class="blog-title animated zoomIn">
          {{ websiteConfig['websiteName'] }}
        </h1>
        <div class="blog-intro">
          <span style="color: #fff">{{ typedConfig.output }}</span>
          <span class="typed-cursor">|</span>
        </div>
      </div>
      <div class="waves-area">
        <svg class="waves-svg" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z" />
          </defs>
          <g class="parallax">
            <use href="#gentle-wave" x="48" y="0" />
            <use href="#gentle-wave" x="48" y="3" />
            <use href="#gentle-wave" x="48" y="5" />
            <use href="#gentle-wave" x="48" y="7" />
          </g>
        </svg>
      </div>
      <div class="scroll-down" @click="scrollDown">
        <v-icon color="#fff" class="scroll-down-effects">mdi-chevron-down</v-icon>
      </div>
    </div>

    <!-- 主页内容 -->
    <v-row class="home-container">
      <v-col md="9" cols="12">
        <!-- 网站公告 -->
        <v-card class="animated zoomIn">
          <div class="announcement">
            <i class="fa fa-volume-up" aria-hidden="true" />
            <div v-if="websiteConfig['websiteNotice'] && websiteConfig['websiteNotice'] !== ''">
              {{ websiteConfig['websiteNotice'] }}
            </div>
            <div v-else>
              作者很懒，什么都没留下~
            </div>
          </div>
        </v-card>

        <!-- 说说轮播 -->
        <v-card v-if="talkList.length > 0" class="animated zoomIn">
          <Swiper :list="talkList" />
        </v-card>

        <!-- 分界线 -->
        <div class="home-hr">
          <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -2px;">
            <path d="M224.2 472.3c-13-5.7-3.7-23.5 8.2-19 91 34 146.8 108.7 182.4 138.5 5.6 4.7 14 2.9 17.3-3.5 16.8-32 45.8-113.7-57.1-168.6-87.3-46.5-188-53.6-247.3-82.2-14.5-7-31.1 4.6-29.9 20.7 5 69.7 28.9 124.7 62.3 181.5 67.3 114.3 140.6 132.9 216.6 104 2.2-0.9 4.5-1.8 7-3 7-3.4 8.3-12.9 2.5-18.1 0.1 0-45.7-69.3-162-150.3z" fill="#FFD401" />
            <path d="M282.7 849.9c79.5-137 172.4-263.1 385.4-401.3 9.8-6.4 2.1-21.5-8.9-17.4C497.7 492.8 429.7 585 373.3 640.8c-8.7 8.7-23.4 6.3-29.1-4.6-27.2-51.8-69.5-174.1 97.3-263.1 147.7-78.8 319.9-91.4 429.7-93.3 18.9-0.3 31.5 19.4 23.3 36.4C863.7 380 842.6 478 789.9 567.6 680.8 753.1 545.5 766.7 422.2 719.8c-8.8-3.4-18.8-0.2-24 7.7-16.6 25.2-50.3 80.1-58.7 122.4-11.4 56.8-82.2 43.9-56.8 0z" fill="#8BC03C" />
            <path d="M375 419.6c-30.1 28.2-45.8 57.7-52.4 86.1 40.6 32.4 70.2 67.7 92.1 85.9 1.2 1 2.5 1.6 3.9 2.1 6.5-6.7 13.3-13.7 20.4-20.7 15.2-37.9 25.3-105.7-64-153.4zM318.8 548.2c1.6 36.1 14.7 67.6 25.5 88.1 5.7 10.9 20.3 13.3 29.1 4.6 4.9-4.9 10-10 15.1-15.4-0.6-1-1.3-2-2.2-2.8 0-0.1-20.1-30.5-67.5-74.5z" fill="#8BA000" />
          </svg>
          文章
        </div>

        <!-- 文章列表 -->
        <v-card v-for="(item, index) of articleList" :key="item.id" class="animated zoomIn article-card">
          <!-- 文章封面图 -->
          <div :class="isRight(index)">
            <router-link :to="'/articles/' + item.id">
              <v-img class="on-hover" width="100%" height="100%" :src="getArticleCover(item)">
                <div class="ribbon">
                  <span v-if="item['articleType'] === 1">原创</span>
                  <span v-if="item['articleType'] === 2">转载</span>
                  <span v-if="item['articleType'] === 3">翻译</span>
                </div>
              </v-img>
            </router-link>
          </div>
          <!-- 文章信息 -->
          <div class="article-wrapper">
            <div class="article-top">
              <router-link :to="'/categories/' + item['categoryId']">
                <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px;">
                  <path d="M179.2 153.6m89.6 0l588.8 0q89.6 0 89.6 89.6l0 486.4q0 89.6-89.6 89.6l-588.8 0q-89.6 0-89.6-89.6l0-486.4q0-89.6 89.6-89.6Z" fill="#FF9C55" />
                  <path d="M25.6 193.4208A91.0208 91.0208 0 0 1 116.6208 102.4H382.592a91.0208 91.0208 0 0 1 87.5008 65.9712l24.5504 85.7216h412.7488A91.0208 91.0208 0 0 1 998.4 345.1392v485.4528A91.0208 91.0208 0 0 1 907.3792 921.6H116.608A91.0208 91.0208 0 0 1 25.6 830.5792V193.408z" fill="#FFD977" />
                  <path d="M128 665.6m25.6 0l76.8 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-76.8 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z" fill="#FFF1C9" />
                  <path d="M128 768m25.6 0l179.2 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-179.2 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z" fill="#FFF1C9" />
                  <path d="M128 486.4m51.2 0l0 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z" fill="#FFA86A" />
                </svg> {{ item['categoryName'] }}
              </router-link>
              <span> | </span>
              <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF" />
                <path d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z" fill="#FFFFFF" />
                <path d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z" fill="#FFFFFF" />
              </svg>
              发布于 {{ item['createTime'] }}
            </div>
            <div class="article-title">
              <router-link :to="'/articles/' + item.id"> {{ item['title'] }} </router-link>
            </div>
            <div class="article-data" style="margin-bottom: 15px">
              <span>
                <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                  <path d="M510.4 65.5l259.69999999 0 1e-8 266.89999999c0 147.50000001-116.2 266.89999999-259.7 266.90000001-143.4 0-259.7-119.5-259.7-266.90000001 0.1-147.5 116.3-266.9 259.7-266.89999999z" fill="#FF9FCF" />
                  <path d="M698.4 525.2l-13 0c53-48.4 86.5-117.8 86.5-195.20000001 0-10.2-0.7-20.3-1.8-30.19999999C613.8 377.50000001 438.6 444.9 266 437.7c15 33.4 36.7 63.1 63.5 87.5l-5.3 0c-122.6 0-225.5 88.1-248.8 204.1C340 677.2 597.7 609.2 862.2 585.7c-44.3-37.6-101.5-60.5-163.8-60.5z" fill="#FF83BB" />
                  <path d="M862.2 585.7C597.7 609.2 340 677.2 75.4 729.3c-3.2 16.1-5 32.6-5 49.6 0 99.8 81.7 181.5 181.5 181.5l518.6 0c99.8 0 181.5-81.7 181.5-181.5 0.1-77.2-35-146.5-89.8-193.2z" fill="#FF5390" />
                  <path d="M770.1 299.8C755.1 168 643.3 65.5 507.4 65.5c-146.1 0-264.5 118.4-264.5 264.5 0 38.4 8.3 74.8 23.1 107.7 172.6 7.2 347.8-60.2 504.1-137.9z" fill="#FF9FCF" />
                  <path d="M436.4 282.1c0 24.1-19.6 43.7-43.7 43.7S349 306.2 349 282.1s19.6-43.7 43.7-43.7c24.19999999 0 43.7 19.6 43.7 43.7z" fill="#FFFFFF" />
                  <path d="M625 282.1m-43.7 0a43.7 43.7 0 1 0 87.4 0 43.7 43.7 0 1 0-87.4 0Z" fill="#FFFFFF" />
                </svg> {{ item.authorNickname }} ·
              </span>
              <span>
                <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                  <path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z" fill="#FF0000" />
                  <path d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z" fill="#FFFFFF" />
                </svg> {{ item.viewCount || 0 }} 热度 ·
              </span>
              <span>
                <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                  <path d="M113.834667 291.84v449.194667a29.013333 29.013333 0 0 0 28.842666 29.013333h252.928v90.453333l160.597334-90.453333h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333h-665.6a29.013333 29.013333 0 0 0-29.696 29.013333z" fill="#FFDEAD" />
                  <path d="M809.130667 262.826667h-665.6a29.013333 29.013333 0 0 0-28.842667 29.013333v40.106667a29.013333 29.013333 0 0 1 28.842667-29.013334h665.6a29.013333 29.013333 0 0 1 29.013333 29.013334V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333z" fill="#FFF3DB" />
                  <path d="M556.202667 770.048h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V362.837333s-59.733333 392.533333-724.309333 314.709334v63.488a29.013333 29.013333 0 0 0 28.842666 29.013333h253.098667v90.453333z" fill="#F2C182" />
                  <path d="M619.008 632.32l101.888-35.157333-131.754667-76.117334 29.866667 111.274667zM891.904 148.992a61.44 61.44 0 0 0-84.138667 22.528l-19.968 34.133333 106.666667 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-22.528-84.138667z" fill="#69BAF9" />
                  <path d="M775.338667 198.775467l131.669333 76.032-186.026667 322.218666-131.6864-76.032z" fill="#F7FBFF" />
                  <path d="M775.168 198.826667l-5.290667 9.216 59.221334 34.133333a34.133333 34.133333 0 0 1 12.458666 46.592l-139.946666 242.346667a34.133333 34.133333 0 0 1-46.762667 12.629333l-59.050667-34.133333-6.656 11.434666 88.746667 51.2L720.896 597.333333l186.026667-322.56z" fill="#D8E3F0" />
                  <path d="M616.448 622.592l2.56 9.728 101.888-35.157333-44.885333-25.941334-59.562667 51.370667zM891.904 148.992c-1.024 0-2.218667-0.853333-3.242667-1.536A61.610667 61.610667 0 0 1 887.466667 204.8l-19.968 34.133333-73.728-42.496-5.12 8.704 106.666666 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-23.381333-83.626667z" fill="#599ED4" />
                  <path d="M265.898667 417.621333H494.933333a17.066667 17.066667 0 1 0 0-34.133333H265.898667a17.066667 17.066667 0 1 0 0 34.133333zM265.898667 533.504H494.933333a17.066667 17.066667 0 0 0 0-34.133333H265.898667a17.066667 17.066667 0 0 0 0 34.133333z" fill="#3D3D63" />
                  <path d="M959.488 354.645333a99.84 99.84 0 0 0-23.722667-127.488 78.677333 78.677333 0 0 0-142.848-64.170666l-11.605333 20.138666a17.066667 17.066667 0 0 0-20.821333 7.168l-32.085334 55.466667H142.677333a46.250667 46.250667 0 0 0-45.909333 46.08v449.194667a46.08 46.08 0 0 0 45.909333 46.08h236.032v73.386666a17.066667 17.066667 0 0 0 8.362667 14.848 17.066667 17.066667 0 0 0 8.704 2.218667 17.066667 17.066667 0 0 0 8.362667-2.218667l156.672-88.234666h248.32a46.08 46.08 0 0 0 46.08-46.08V398.677333L921.6 283.306667a17.066667 17.066667 0 0 0-4.266667-21.504l1.877334-3.413334a65.365333 65.365333 0 0 1 10.410666 79.189334l-53.077333 91.989333a56.832 56.832 0 0 0 20.821333 77.653333 17.066667 17.066667 0 0 0 24.234667-6.314666 17.066667 17.066667 0 0 0-6.997333-23.04 23.04 23.04 0 0 1-8.362667-31.061334z m-138.410667 386.389334a11.946667 11.946667 0 0 1-11.946666 11.946666H556.202667a17.066667 17.066667 0 0 0-8.362667 2.218667l-134.997333 76.117333v-61.269333a17.066667 17.066667 0 0 0-17.066667-17.066667H142.677333a11.946667 11.946667 0 0 1-11.776-11.946666V291.84a11.946667 11.946667 0 0 1 11.776-11.946667h565.930667L574.464 512a17.066667 17.066667 0 0 0-1.706667 12.970667L597.333333 615.253333H265.898667a17.066667 17.066667 0 1 0 0 34.133334h352.938666a17.066667 17.066667 0 0 0 5.802667 0l102.4-35.328a17.066667 17.066667 0 0 0 9.216-7.509334l85.333333-147.968z m-204.8-184.661334l63.829334 36.864-49.322667 17.066667z m206.848-170.666666v1.365333l-108.373333 186.709333-102.4-59.050666L781.482667 221.866667l102.4 59.050666z m76.458667-161.28L887.466667 244.224l-76.970667-44.373333 11.264-19.797334a44.544 44.544 0 1 1 77.141333 44.544z" fill="#3D3D63" />
                </svg> {{ item['commentCount'] || 0 }} 条评论 ·
              </span>
              <span>
                <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                  <path d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z" fill="#FF713C" />
                  <path d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z" fill="#885F44" />
                </svg> {{ item['likeCount'] || 0 }} 点赞
              </span>
            </div>
            <div class="article-content">
              {{ item['content'] }}
            </div>
            <div class="article-label">
              <router-link v-for="tag of item['tagList']" :key="tag.id" style="display:inline-block" :to="'/tags/' + tag.id" class="mr-1">
                <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px;">
                  <path d="M905.0112 560.4352l-342.784 342.784c-56.7808 56.7808-148.7872 56.7808-205.568 0l-231.5776-231.5776c-56.7808-56.7808-56.7808-148.7872 0-205.568l342.9376-342.9376a114.8928 114.8928 0 0 1 84.224-33.5872l266.3936 7.2192c60.7744 1.6384 109.7216 50.3808 111.5648 111.1552l8.2944 267.8272c1.024 31.6928-11.1104 62.3104-33.4848 84.6848z" fill="#8C7BFD" />
                  <path d="M675.2256 491.4688c-82.176 0-149.0432-66.8672-149.0432-149.0432s66.8672-149.0432 149.0432-149.0432 149.0432 66.8672 149.0432 149.0432-66.8672 149.0432-149.0432 149.0432z m0-192.2048c-23.808 0-43.2128 19.3536-43.2128 43.2128 0 23.808 19.3536 43.2128 43.2128 43.2128 23.808 0 43.2128-19.3536 43.2128-43.2128s-19.4048-43.2128-43.2128-43.2128z" fill="#FFE37B" />
                </svg> {{ tag['name'] }}
              </router-link>
            </div>
          </div>
        </v-card>

        <!-- 无限加载 -->
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-results" />
          <div slot="no-more" />
        </infinite-loading>
      </v-col>

      <!-- 博客信息 -->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div class="blog-wrapper">
          <!-- 基础介绍 -->
          <v-card class="animated zoomIn blog-card mt-5">
            <div class="author-wrapper">
              <v-avatar size="110">
                <img :src="websiteConfig['websiteAvatar']" class="author-avatar" alt="404">
              </v-avatar>
              <div style="font-size: 1.375rem; margin-top:0.625rem;">
                {{ websiteConfig['websiteAuthor'] || websiteConfig['websiteName'] }}
              </div>
              <div v-if="websiteConfig['websiteIntro'] && websiteConfig['websiteIntro'] !== ''" style="font-size: 0.875rem;">
                {{ websiteConfig['websiteIntro'] }}
              </div>
            </div>
            <div class="blog-info-wrapper">
              <div class="blog-info-data">
                <router-link to="/archives">
                  <div style="font-size: 0.875rem">文章</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.articleCount || 0 }}
                  </div>
                </router-link>
              </div>
              <div class="blog-info-data">
                <router-link to="/categories">
                  <div style="font-size: 0.875rem">分类</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.categoryCount || 0 }}
                  </div>
                </router-link>
              </div>
              <div class="blog-info-data">
                <router-link to="/columns">
                  <div style="font-size: 0.875rem">专栏</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.columnCount || 0 }}
                  </div>
                </router-link>
              </div>
              <div class="blog-info-data">
                <router-link to="/tags">
                  <div style="font-size: 0.875rem">标签</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.tagCount || 0 }}
                  </div>
                </router-link>
              </div>
            </div>
            <a v-if="socialConfig['github'] && socialConfig['github'] !== ''" class="collection-btn" :href="socialConfig['github']" target="_blank">
              <v-icon color="#fff" size="18" class="mr-1">mdi-star-outline</v-icon>
              Go to star!
            </a>
            <div class="card-info-social">
              <a v-if="socialConfig['qq'] && socialConfig['qq'] !== ''" target="_blank" :href="socialConfig['qq']" class="mr-5 iconfont icon-qq" />
              <a v-if="socialConfig['wechat'] && socialConfig['wechat'] !== ''" target="_blank" :href="socialConfig['weixin']" class="mr-5 iconfont icon-wechat" />
              <a v-if="socialConfig['github'] && socialConfig['github'] !== ''" target="_blank" :href="socialConfig['github']" class="mr-5 iconfont icon-github" />
              <a v-if="socialConfig['gitee'] && socialConfig['gitee'] !== ''" target="_blank" :href="socialConfig['gitee']" class="iconfont icon-gitee" />
              <a v-if="socialConfig['weibo'] && socialConfig['weibo'] !== ''" target="_blank" :href="socialConfig['gitee']" class="iconfont icon-weibo" />
            </div>
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-chili-hot</v-icon>
              热门文章
            </div>
            <div class="blog-card-info" />
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-tag-multiple</v-icon>
              标签云
            </div>
            <div class="blog-card-info">
              <TagCloud ref="tagCloud" :chart-data="tagList" @click.native="gotoTagPage" />
            </div>
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-comment-processing</v-icon>
              最新评论
            </div>
            <div class="blog-card-info" />
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-cloud</v-icon>
              网站资讯
            </div>
            <div class="blog-card-info">
              <div style="padding:4px 0 0">
                访问数:<span class="float-right"> {{ countInfo.viewsCount || 0 }}</span>
              </div>
              <div style="padding:4px 0 0">
                游客数:<span class="float-right"> {{ countInfo.visitorCount || 0 }}</span>
              </div>
              <div style="padding:4px 0 0">
                用户数:<span class="float-right"> {{ countInfo.userCount || 0 }}</span>
              </div>
              <div style="padding:4px 0 0">
                评论数:<span class="float-right"> {{ countInfo.commentCount || 0 }}</span>
              </div>
              <div style="padding:4px 0 0">
                留言数:<span class="float-right"> {{ countInfo.messageCount || 0 }}</span>
              </div>
              <div style="padding:4px 0 0">
                建站时间:<span class="float-right">{{ websiteConfig['websiteCreateTime'] }}</span>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- 提示消息 -->
    <!-- <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar> -->
  </div>
</template>

<script>
import EasyTyper from 'easy-typer-js'
import NoArticleCoverImg from '../../assets/images/no-article-cover.png'
import Swiper from '../../components/Swiper.vue'
import TagCloud from '../../components/TagCloud.vue'
export default {
  name: 'Home',
  components: {
    Swiper, TagCloud
  },
  data() {
    return {
      tip: false,
      typedConfig: {
        output: '',
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true
      },
      noArticleCoverImg: NoArticleCoverImg,
      articleDefaultImg: '',
      articleList: [],
      talkList: [],
      tagList: [],
      articlePage: 1,
      articlePageSize: 10
    }
  },
  computed: {
    cover() {
      let cover = ''
      this.$store.state.pageList.forEach(item => {
        if (item['pageLabel'] === 'home') {
          cover = item['pageCover']
          return 'background: url(' + cover + ') center center / cover no-repeat'
        }
      })
      return 'background: url(' + cover + ') center center / cover no-repeat'
    },
    isRight() {
      return function(index) {
        if (index % 2 === 0) {
          return 'article-cover left-radius'
        }
        return 'article-cover right-radius'
      }
    },
    websiteConfig() {
      return this.$store.state.websiteConfig
    },
    socialConfig() {
      return this.$store.state.socialConfig
    },
    countInfo() {
      return this.$store.state.countInfo
    }
  },
  created() {
    this.init()
    this.listHomeTalks()
    this.listHomeTags()
    this.queryArticleDefaultImg()
  },
  methods: {
    init() {
      document.title = this.websiteConfig['websiteName']
      fetch('https://v1.hitokoto.cn?c=i').then(res => {
        return res.json()
      }).then(({ hitokoto }) => {
        this.initTyped(hitokoto)
      })
    },
    initTyped(input, fn, hooks) {
      const config = this.typedConfig
      // eslint-disable-next-line no-unused-vars
      const typed = new EasyTyper(config, input, fn, hooks)
    },
    scrollDown() {
      window.scrollTo({
        behavior: 'smooth',
        top: document.documentElement.clientHeight
      })
    },
    listHomeTalks() {
      this.$mapi.portal.queryBoardTalkList().then(({ data }) => {
        this.talkList = data
      }).catch(_ => {
        this.talkList = []
      })
    },
    listHomeTags() {
      this.$nextTick(() => {
        this.$mapi.portal.queryBoardTagList().then(({ data }) => {
          this.tagList = data
        }).catch(_ => {
          this.tagList = []
        })
      })
    },
    queryArticleDefaultImg() {
      this.$mapi.other.queryArticleDefaultImg().then(res => {
        const { data } = res
        this.articleDefaultImg = data || ''
      }).catch(_ => {
        this.articleDefaultImg = ''
      })
    },
    getArticleCover(article) {
      if (article['coverImageType'] === 5) {
        return this.noArticleCoverImg
      } else if (article['coverImageType'] === 3) {
        return this.articleDefaultImg
      } else {
        return article['articleImgLinkList'] && article['articleImgLinkList'].length > 0 ? article['articleImgLinkList'][0] : ''
      }
    },
    gotoTagPage() {
      if (this.$refs.tagCloud.chart['yid']) {
        this.$router.push('/tags/' + this.$refs.tagCloud.chart['yid'])
      }
    },
    infiniteHandler($state) {
      const param = {
        page: this.articlePage,
        pageSize: this.articlePageSize
      }
      this.$mapi.portal.queryArticleList(param).then(({ data }) => {
        if (data.list.length === 0) {
          $state.complete()
        } else {
          this.articleList.push(...data.list)
          this.articlePage++
          $state.loaded()
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.typed-cursor
  opacity: 1;
  color: #fff;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
  @keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  @-webkit-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  @-moz-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
</style>

<style scoped>
/* home-banner */
.home-banner {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
}
.home-banner:before {
  position: absolute;
  /* top: -60px; */
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0,0,0,.25);
  content: "";
}
.banner-container {
  margin-top: 43vh;
  line-height: 2.0;
  user-select: none;
  color: #fff;
}
.blog-intro {
  width: max-content;
  margin: 0 auto;
  cursor: pointer;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

/* waves-area */
.waves-area {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -10px;
  z-index: 1;
  display: block !important;
}
.waves-area .waves-svg {
  width: 100%;
  height: 4rem;
}
.parallax>use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
  fill: #5782f038;
}
.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
  fill: #b2c2eb38;
}
.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
  fill: #7d9be238;
}
.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
  fill: #bdc9e738;
}

/* scroll-down */
.scroll-down {
  cursor: var(--globalPointer);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
}
.scroll-down i {
  font-size: 2rem;
}
.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}

/* announcement */
.announcement {
  margin-top: 20px;
  padding: 22px 22px 22px 30px;
  display: flex;
  /* border: 1px dashed #DDDDDD; */
  /* max-width: 780px; */
}
.announcement i {
  color: red;
  font-size: 22px;
  margin: auto 0;
  animation: scale 0.8s ease-in-out infinite;
}
.announcement div {
  white-space: pre-line;
  margin-left: 20px;
  line-height: 30px;
}

/* home-hr */
.home-hr {
  color: #797979;
  border-bottom: 1px dashed #DDDDDD;
  padding-bottom: 5px;
  margin: 30px 0 50px 0;
}

/* 文章的卡片样式 */
.article-card {
  user-select: none;
  border-radius: 12px 8px 8px 12px;
}
.article-cover {
  overflow: hidden;
}
.left-radius {
  border-radius: 8px 0 0 8px !important;
  order: 0;
}
.right-radius {
  border-radius: 0 8px 8px 0 !important;
  order: 1;
}

/* 文章信息样式 */
.article-wrapper {
  height: 100%;
  padding: 1.25rem 2rem;
}
.article-wrapper a {
  font-size: 14px;
}
.article-wrapper a {
  transition: all 0.3s;
}
.article-wrapper a:hover {
  color: #8e8cd8;
}
.article-wrapper .article-top {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.article-wrapper .article-top, .article-wrapper .article-top a {
  font-size: 12px !important;
  color: #797979;
}
.article-wrapper .article-top a:hover {
  color: #8e8cd8;
}
.article-wrapper .article-title a {
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 20px 0;
}
.article-wrapper .article-data {
  font-size: 12px !important;
  color: #797979;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.article-wrapper .article-data span {
  padding-right: 0;
}
.article-wrapper .article-content {
  font-size: 16px;
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.article-wrapper .article-label {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.article-wrapper .article-label span {
  padding: 3px 10px;
  background-color: #EEEEEE;
  border-radius: 3px;
  font-size: 12px;
  color: #797979;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}
.article-wrapper .article-label span:hover {
  background-color: orange;
  color: white;
}

/* 博客信息样式 */
.blog-wrapper {
  position: sticky;
  top: 10px;
}
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}
.blog-card .blog-card-title {
  font-size: 1em;
  text-align: center;
  color: #9a37c5;
  font-weight: 900;
  padding-bottom: 10px;
}
.blog-card .blog-card-title .v-icon {
  color: #9a37c5;
}
.blog-card .blog-card-info {
  padding: 0.25rem;
  font-size: 0.875rem;
}

/* 基本信息 */
.author-wrapper {
  text-align: center;
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
.blog-info-wrapper {
  display: flex;
  justify-self: center;
  padding: 0.875rem 0;
}
.blog-info-data {
  flex: 1;
  text-align: center;
}
.blog-info-data a {
  text-decoration: none;
}
.blog-info-data a:hover {
  color: #8e8cd8;
}
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  transition-duration: 1s;
  transition-property: color;
}
.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}
.card-info-social {
  line-height: 40px;
  text-align: center;
  margin: 6px 0 -6px;
}
.card-info-social a {
  font-size: 1.5rem;
}

/* Pc */
@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }
  .blog-intro {
    font-size: 1.5rem;
  }
  .home-container {
    max-width: 1200px;
    margin: calc(100vh - 48px) auto 28px auto;
    padding: 0 5px;
  }
  .article-card {
    display: flex;
    overflow: hidden;
    align-items: center;
    height: 300px;
    width: 100%;
    margin-top: 20px;
  }
  .article-cover {
    height: 100%;
    width: 50%;
  }
  .article-cover >>> .on-hover {
    transition: all 1s;
  }
  .article-cover >>> .on-hover:hover {
    transform: scale(1.1);
  }
  .article-wrapper {
    width: 55%;
  }
  .article-wrapper .article-label {
    position: absolute;
    bottom: 20px;
  }
}

/* Mobile */
@media (max-width: 759px) {
  .blog-title {
    font-size: 26px;
  }
  .waves-area .waves-svg {
    height: 40px;
    min-height: 40px;
  }
  .home-container {
    width: 100%;
    margin: calc(100vh - 66px) auto 0 auto;
  }
  .home-hr {
    margin: 30px 0 40px 0;
  }
  .article-card {
    margin-top: 1rem;
  }
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }
  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }
  .article-wrapper {
    width: 100%;
  }
  .article-wrapper .article-label {
    padding-top: 15px;
  }
}
</style>
