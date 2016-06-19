<template>
  <div class="desc-box" >
    <div v-show="!lottoStartEnd">
      <p>您的积分: {{score}}</p>
      <p>轻选择参与游戏分数值: &nbsp;
        <label for="" v-for="it in bet"><input type="radio" name="bet" v-model="betScore" v-bind:checked="it.checked" v-bind:value="it.score">{{it.score}}</label>
      </p>
      <p>
        请猜结果: &nbsp;
        <label for=""><input type="radio" v-model="lotSts" name="sts" value="b" checked>大</label>
        <label for=""><input type="radio" v-model="lotSts" name="sts" value="s">小</label>
      </p>
      <p>
        <button type="button" id="lotto-btn" class="start" v-bind:disabled="isStart">开始</button>
      </p>
      <p>&nbsp;</p>
      <p class="lh-14">游戏说明： </p>
      
      <p class="lh-14 padding-tb0">1.压500赢1000积分、压1000赢3000积分、压10000赢20000积分。</p>
      <p class="lh-14 padding-tb0">2.每个账号每天可以参与三次猜大小，贡献值额度不限。</p>
      <p class="lh-14 padding-tb0">3.猜大小的结果将影响当前相应的贡献值。</p>

    </div>
    <div class="tip" v-show="lottoStartEnd">
      <div class="btn-box" id="lotto-is-win-btn">
        <template v-if="isWin">
          <img src="../../../assets/images/lotto-btn-win.png"  class="is-win" alt="" >
        </template>
        <template v-else>
          <img src="../../../assets/images/lotto-btn-nowin.png"  class="is-win" alt="" >
        </template>
      </div>
      <p>&nbsp;</p>
      <p class="lh-14" style="padding-left:85px;">游戏说明:</p>
      <p class="lh-14 padding-tb0" style="padding-left:85px;">2,3,4,5,6 7小 &nbsp;&nbsp; 8,9,10,11,12大</p>
    </div>
  </div>  
</template>
<script>
import golMdule from '../../../module/index';
var {getUser,getBet} = golMdule;
var
  stop = false,
  lop = 0,
  id,
  size = 8;
var getRandom = (n1, n2) => {
  // r 节点索引和, r1, r2 节点索引
  var
    r = 0,
    r1 = Math.floor(Math.random() * 6),
    r2 = Math.floor(Math.random() * 6);
  if( r > 10 || r == (n1+n2-2) ) {
    getRandom();
  } else {
    return [r1, r2];
  }
}
var setLop = (vm, n1, n2, bol) => {
  var
    svg = vm.$parent.$children[0].$el,
    nodeG = svg.getElementsByTagName('g'),
    img1 = nodeG[0].getElementsByTagName('use'),
    img2 = nodeG[1].getElementsByTagName('use');

  for(var i = 0 ; i < size; i++ ) {
    img1.item(i).style.opacity = img2.item(i).style.opacity = 0
  }
  if( bol ) {
    img1.item(n1).style.opacity = 1;
    img2.item(n2).style.opacity = 1;
  } else {
    img1.item(n1).style.opacity = img2.item(n1).style.opacity = 1;     
  }
}
var sAnimate = (vm, n1, n2, btn) => {
  cancelAnimationFrame(id);
  if( lop >= size ) {
    lop = 0;
  }
  if( !stop ) {
    setLop(vm, lop);
    lop++;
    id = requestAnimationFrame(function () {
      sAnimate(vm, n1, n2, btn);
    });
    return;   
  }
  lop = 0;
  stop = false
  setLop(vm, n1-1, n2-1, !0);
  vm.lottoStartEnd = true;
  btn.removeAttribute('disabled');
}
// 获取两个随机数, 返回与中奖点数相等的两个随机数
var getNum = (vm, num) => {
  var 
    n1 = Math.floor(Math.random() * 6 + 1 ),
    n2 = Math.floor(Math.random() * 6 + 1);
  // 中奖点数 
  if( vm.isWin ) {
    if( n1 + n2 == num )   {
      return [n1, n2] 
    } else {
      getNum(vm, num);
    }    
  } else {
    if( 
      (vm.lotSts === 'b' && (n1 + n2) <= 7) || 
      (vm.lotSts === 's' && (n1 + n2) >= 8)
    ){
      return [n1, n2] 
    }  else {
      getNum(vm, num);
    }     
  }
}
var lottoStart = (vm) => {
  var 
    n,
    svg = vm.$parent.$children[0].$el,
    btn = utils.getId('lotto-btn'),
    isWinBtn = utils.getId('lotto-is-win-btn');
  Hammer(isWinBtn).on('tap', function () {
    setTimeout(function (){vm.lottoStartEnd = false;},100);
  })
  Hammer(btn).on('tap', function () {
    btn.disabled = true;
    var betKind;
    for(var i = 0, len = vm.bet.length; i < len; i++ ) {
      if(vm.bet[i].checked) {
        betKind = i+1;
      }
    }
    var betData = utils.extend({}, config.reqParam, {
        betKind: betKind ,
        betValue: vm.betScore
      });
    // console.log(betData); return;
    sAnimate(vm, Math.floor(Math.random() * 6 + 1 ), Math.floor(Math.random() * 6 + 1 ), btn);
    var num = (cb) => {
      //用户压的大小, s 小, b 大
      if( vm.lotSts === 's') {
        // 2 - 7
        n = getNum(vm, Math.floor(Math.random() * 6 + 2 ))
      } else {
        // 8 - 12
        n = getNum(vm, Math.floor(Math.random() * 5 + 8 ))
      }
      if( !n ) {
        num();
        return;
      }
      if(cb){
        cb();
        return;
      }
      sAnimate(vm, n[0], n[1], btn);
    }
    utils.ajax({
      url: config.URL + 'doDice.do',
      dataType: 'JSON',
      type: 'post',
      data: betData,
      success (res) {
        if(res.rescode == 100) {
          vm.$root.userInfo.availableDevoteValue = res.data.availableDevoteValue;
          vm.score = res.data.availableDevoteValue;
          if( parseInt(res.data.winFlg) == 0 ) {
            vm.isWin = true;
            stop = true;
            num();
            init(vm)
            return;
          }
        }
        init(vm)
        vm.isWin = false;
        stop = true;
        num();
      },
      error (xhr) {
        setTimeout(function () {
          stop = true;
          // 由后台返回的是否命中
          vm.isWin = false;
          num()
        },500);
      }
    })     
  });
};
var init = (vm) => {
  var rootVM = vm.$root;
  var arr = [];
  
  utils.ajax({
    url: config.URL + 'initDice.do',
    type: 'post',
    dataType: 'json',
    data: config.reqParam,
    success (res) {
      if( res.rescode == 100 ) {
        vm.data = res.data;
        rootVM.userInfo.availableDevoteValue = +res.data.availableDevoteValue;
        
        arr[0] = {checked: true, score: res.data.betValue1};
        arr[1] = {checked: false, score: res.data.betValue2};
        arr[2] = {checked: false, score: res.data.betValue3};
        vm.score = res.data.availableDevoteValue;
        // if( +res.data.availableDevoteValue >= +vm.data.betValue1 ) {
        //   vm.isStart = false
        // } else {
        //   vm.isStart = true
        // } 

        vm.bet = arr

      } else {
        utils.dialog(res.message);
      }
    },
    erroe (xhr) {
      utils.dialog('暂时无数据');
    }
  })
}
// 测试数据
var bet = utils.extend([], [{score: 500, checked: true},{  score: 1000,  checked: false},{score: 10000, checked: false}])



var getALL = (vm) => {
  // 获取用户信息
  getUser(function (data){
  // vm.$root.userInfo = data;
  })
  // 获取赌注信息
  getBet(function (data){
  // vm.bet = []
  }) 
}
export default {
  data () {
    return {
      data: {},
      score: 5000,
      bet:[],
      isStart: true,
      // 投注数
      betScore: '',
      //是否命中
      isWin: false,
      // 猜的大小
      lotSts: '',
      lottoStartEnd: false,
    }
  },
  watch: {
    betScore (v) {
      if(v > this.score) {
        this.isStart = false
      } 
      else {
        this.isStart = true
      }
    },
    score (v) {
      var n = parseFloat(v);
      if( n >= this.data.betValue1) {
        this.isStart = false;
      } else {
        this.isStart = true
      }
    }
  },
  ready () {
    var t = this;
    // getALL(t);
    lottoStart(this);
    window.lottoVM = t
    // 获取用户id
    // 获取用户积分
    this.$on('init', function () {
     
      // getALL(t);
      init(t);
      this.lottoStartEnd = false
      this.isWin = false;
      this.betScore = '';
      // this.score = 5000;
      // this.bet = bet;
    })
  }
}
</script>