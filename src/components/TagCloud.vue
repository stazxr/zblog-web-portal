<template>
  <div>
    <div id="tagCloud" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  props: {
    width: {
      default: '100%',
      type: String
    },
    height: {
      default: '100%',
      type: String
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      option: {
        title: { text: '', x: 'center' },
        backgroundColor: '#fff',
        // tooltip: {
        //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        // },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 10,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 40],
            // 用来调整词的旋转方向，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            // 随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function() {
                return (
                  'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')'
                )
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            data: []
          }
        ]
      }
    }
  },
  watch: {
    chartData: {
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('tagCloud'))
      this.setOptions(this.chartData)
      this.chart.on('click', function(params) {
        this.yid = params.data.id
      })
    },
    setOptions(data) {
      const chartData = []
      for (let i = 0; i < data.length; i++) {
        chartData.push({ id: data[i].id, name: data[i].name, value: data[i].value })
      }

      this.option.series[0].data = chartData
      this.chart.setOption(this.option)
    }
  }
}
</script>
