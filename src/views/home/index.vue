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
          📔 文章列表
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
        <infinite-loading spinner="bubbles" @infinite="infiniteHandler">
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
              Go to star !
            </a>
            <!-- <v-divider v-else /> -->
            <div class="card-info-social">
              <a v-if="socialConfig['qq'] && socialConfig['qq'] !== ''" target="_blank" :href="socialConfig['qq']">
                <svg viewBox="0 0 1024 1024" width="24" height="24" class="card-info-social-icon">
                  <path d="M512 0C229.224296 0 0 229.224296 0 512s229.224296 512 512 512 512-229.224296 512-512S794.775704 0 512 0zM801.261037 668.86163c-21.731556 18.640593-49.948444-61.345185-54.006519-49.038222-9.879704 29.923556-14.506667 49.929481-43.633778 82.507852-1.554963 1.744593 33.659259 14.468741 43.633778 41.642667 9.557333 26.017185 28.141037 67.26163-93.487407 80.213333-71.35763 7.585185-122.936889-38.020741-128.075852-37.584593-9.53837 0.83437-5.290667 0-15.530667 0-8.38163 0-8.931556 0.606815-16.820148 0-2.161778-0.170667-25.884444 37.584593-131.963259 37.584593-82.223407 0-103.518815-51.749926-86.983111-80.213333 16.535704-28.463407 44.126815-36.750222 40.239407-41.263407-19.152593-22.186667-32.350815-45.909333-40.239407-67.356444-1.953185-5.347556-3.584-10.543407-4.873481-15.530667-2.996148-11.45363-25.884444 67.204741-50.460444 49.038222-24.576-18.166519-22.376296-64.417185-6.46637-108.676741 16.042667-44.619852 56.471704-87.589926 56.926815-97.071407 1.611852-35.290074-3.489185-41.14963 0-50.422519 7.755852-20.764444 17.199407-12.8 17.199407-23.570963 0-135.736889 100.864-245.76 225.28-245.76s225.28 110.042074 225.28 245.76c0 5.195852 13.520593 0 19.986963 23.570963 1.327407 4.873481 2.23763 23.665778 0.663704 50.422519-0.739556 12.856889 34.266074 28.501333 52.375704 97.071407C828.434963 628.754963 810.30637 661.105778 801.261037 668.86163z" fill="#68A5E1" p-id="27993" />
                </svg>
              </a>
              <a v-if="socialConfig['weChat'] && socialConfig['weChat'] !== ''" target="_blank" :href="socialConfig['weChat']">
                <svg viewBox="0 0 1024 1024" width="24" height="24" class="card-info-social-icon">
                  <path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="18009" />
                  <path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="18010" />
                </svg>
              </a>
              <a v-if="socialConfig['github'] && socialConfig['github'] !== ''" target="_blank" :href="socialConfig['github']">
                <svg viewBox="0 0 1024 1024" width="24" height="24" class="card-info-social-icon">
                  <path d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0" fill="#3E75C3" p-id="16684" />
                </svg>
              </a>
              <a v-if="socialConfig['gitee'] && socialConfig['gitee'] !== ''" target="_blank" :href="socialConfig['gitee']">
                <svg viewBox="0 0 1024 1024" width="24" height="24" class="card-info-social-icon">
                  <path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="16852" />
                </svg>
              </a>
              <a v-if="socialConfig['csdn'] && socialConfig['csdn'] !== ''" target="_blank" :href="socialConfig['csdn']">
                <svg viewBox="0 0 1024 1024" width="24" height="24" class="card-info-social-icon">
                  <path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#CE000D" p-id="17052" />
                </svg>
              </a>
            </div>
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-chili-hot</v-icon>
              热门文章
            </div>
            <div class="blog-card-info hot-articles">
              <ul v-for="item in hotArticleList" :key="item.id">
                <li>
                  <router-link :to="'/articles/' + item.id">
                    <span>{{ item['title'] }}</span>
                    <img src="https://file.suntaoblog.com/icon/readCountWhite.png" alt="">
                    <span class="read">{{ item['viewCount'] }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </v-card>
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="blog-card-title">
              <v-icon size="18">mdi-format-columns</v-icon>
              分类专栏
            </div>
            <div class="blog-card-info categories">
              <ul v-for="item in categoryList" :key="item.id">
                <li>
                  <div v-if="item['pid'] == null" class="categories-item">
                    <div class="special-column-bar" />
                    <img v-if="item['imageUrl'] != null && item['imageUrl'] !== ''" :src="item['imageUrl']" alt="">
                    <span :title="item['name']">{{ item['name'] }}</span>
                  </div>
                  <router-link v-else class="categories-item" :to="'/categories/' + item['id']">
                    <div class="special-column-bar special-column-bar-second" />
                    <img v-if="item['imageUrl'] != null && item['imageUrl'] !== ''" :src="item['imageUrl']" alt="">
                    <span :title="item['name']">{{ item['name'] }}</span>
                  </router-link>
                  <div class="special-column-num">{{ item['articleCount'] || 0 }}篇</div>
                </li>
              </ul>
            </div>
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
            <div class="blog-card-info lasted-comments">
              <div v-for="item in lastedCommentList" :key="item.id" class="lasted-comments-list-item">
                <div class="lasted-comments-avatar">
                  <img :src="item['avatar']" class="lasted-comments-avatar-img" alt="">
                </div>
                <div class="lasted-comments-content">
                  <router-link v-if="item['type'] === 1" :to="'/articles/' + item['objectId'] + '#' + item['id']" class="lasted-comments-content-comment">
                    <div v-html="item['content']" />
                  </router-link>
                  <router-link v-if="item['type'] === 2" :to="'/links#' + item['id']" class="lasted-comments-content-comment">
                    <div v-html="item['content']" />
                  </router-link>
                  <router-link v-if="item['type'] === 3" :to="'/talks/' + item['objectId'] + '#' + item['id']" class="lasted-comments-content-comment">
                    <div v-html="item['content']" />
                  </router-link>
                  <div class="lasted-comments-content-author">
                    <!-- {{ item['type'] === 1 ? '文章' : item['type'] === 2 ? '说说' : '友链' }} · -->
                    <span>{{ item['nickname'] }} · {{ item['ipSource'] }}</span>
                  </div>
                </div>
              </div>
            </div>
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
                弹幕数:<span class="float-right"> {{ countInfo.messageCount || 0 }}</span>
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
      hotArticleList: [],
      categoryList: [],
      lastedCommentList: [],
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
    this.listArticles()
    this.listHomeTalks()
    this.listHomeTags()
    this.listLastedComments()
    this.listHotArticles()
    this.listCategories()
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
    listArticles() {
      const param = {
        page: this.articlePage,
        pageSize: this.articlePageSize
      }
      this.$mapi.portal.queryArticleList(param).then(({ data }) => {
        if (data.list.length !== 0) {
          this.articlePage++
          this.articleList.push(...data.list)
        }
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
    listHotArticles() {
      this.$mapi.portal.queryBoardHotArticleList().then(({ data }) => {
        this.hotArticleList = data
      }).catch(_ => {
        this.hotArticleList = []
      })
    },
    listCategories() {
      this.$mapi.portal.queryBoardCategoryList().then(({ data }) => {
        this.categoryList = data
      }).catch(_ => {
        this.categoryList = []
      })
    },
    listLastedComments() {
      this.$mapi.portal.queryBoardLastedCommentList().then(({ data }) => {
        this.lastedCommentList = data
      }).catch(_ => {
        this.lastedCommentList = []
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
          this.articlePage++
          this.articleList.push(...data.list)
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
.card-info-social-icon {
  margin: 0 10px !important;
}

/* 热门文章 */
.blog-card .blog-card-info.hot-articles {
  padding: 12px 16px 16px 16px;
  overflow: hidden;
}
.blog-card .blog-card-info.hot-articles ul {
  list-style: none;
  margin-top: -8px;
  word-wrap: break-word;
}
.blog-card .blog-card-info.hot-articles ul li {
  margin-bottom: 20px;
  word-wrap: break-word;
}
.blog-card .blog-card-info.hot-articles ul li a {
  display: block;
  word-wrap: break-word;
}
.blog-card .blog-card-info.hot-articles ul li a img {
  width: 14px;
  height: 14px;
  border: 0;
  outline: none;
  vertical-align: -1px;
  margin-right: 3px;
  margin-left: 4px;
  word-wrap: break-word;
}
.blog-card .blog-card-info.hot-articles ul li a .read {
  font-size: 12px;
  color: #999aaa;
  line-height: 24px;
  word-wrap: break-word;
}

/* 分类专栏 */
.blog-card .blog-card-info.categories {
  padding: 12px 16px 16px 16px;
  overflow: hidden;
}
.blog-card .blog-card-info.categories:before {
  display: block;
  position: absolute;
  content: "";
  width: 1px;
  height: 12px;
  background: #fff;
  left: 0;
  top: 0;
}
.blog-card .blog-card-info.categories ul {
  border-left: 1px dashed #ccccd8;
  margin: 0;
  padding: 0;
  list-style: none;
}
.blog-card .blog-card-info.categories ul li {
  margin: 0;
  padding: 5px 0;
  list-style: none;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}
.blog-card .blog-card-info.categories ul li .categories-item {
  text-decoration: none;
  outline: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  -webkit-box-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.blog-card .blog-card-info.categories ul li .categories-item .special-column-bar {
  width: 12px;
  height: 1px;
  border-bottom: 1px dashed #ccccd8;
  flex-shrink: 0;
}
.blog-card .blog-card-info.categories ul li .categories-item .special-column-bar-second {
  width: 36px;
}
.blog-card .blog-card-info.categories ul li .special-column-num {
  color: #999aaa;
  font-size: 14px;
  line-height: 16px;
  flex-shrink: 0;
  margin-left: 16px;
}
.blog-card .blog-card-info.categories ul li .categories-item img {
  width: 32px;
  height: 18px;
  border: 1px solid #e8e8ed;
  border-radius: 2px;
  display: block;
  margin-right: 8px;
  margin-left: 4px;
}
.blog-card .blog-card-info.categories ul li .categories-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 评论 */
.lasted-comments > .lasted-comments-list-item {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
}
.lasted-comments > .lasted-comments-list-item .lasted-comments-avatar {
  overflow: hidden;
  border-radius: 10px;
  width: 4em;
  height: 4em;
}
.lasted-comments > .lasted-comments-list-item .lasted-comments-avatar .lasted-comments-avatar-img {
  overflow: hidden;
  border-radius: 10px;
  width: 4em;
  height: 4em;
}
.lasted-comments > .lasted-comments-list-item .lasted-comments-content {
  -webkit-box-flex: 1;
  flex: 1;
  padding-left: 10px;
  word-break: break-all;
}
.lasted-comments > .lasted-comments-list-item .lasted-comments-content .lasted-comments-content-comment {
  font-size: 95%;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.lasted-comments > .lasted-comments-list-item .lasted-comments-content .lasted-comments-content-author {
  display: block;
  color: #858585;
  font-size: 85%;
  -webkit-line-clamp: 1;
  max-height: 20px;
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
