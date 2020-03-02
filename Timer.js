var Timer = (
  function(){
    //인자로 콜백 될 함수와 콜백 함수에서 사용될 인자를 받는다. 
    function Timer(){
      //실행되야할 콜백 목록
      this.innerTimerList = [];
      //반복실행을 원하는 시간
      this.time = 0;
    }
  
    //Timer내부적으로 쓰인다. 콜백을 Timer에 등록할 수 있게 하는 객체를 생성
    function InnerTimer(){
      //콜백
      this.callback = Array.prototype.shift.call(arguments);
    }
  
    //실행되야 하는 콜백을 등록하는 함수
    //callback, time을 순서대로 입력한다.
    Timer.prototype.setTimerFn = function(){
      //콜백
      var callback = Array.prototype.shift.call(arguments);
  
      //반복실행을 원하는 시간
      this.time = Array.prototype.shift.call(arguments);
  
      var innerTimer = new InnerTimer(callback);
  
      this.innerTimerList.push(innerTimer);
    }
  
    //콜백들을 일정 시간 기준으로 실행시키는 함수
    Timer.prototype.startIntervalTimer = function(){
      var _this = this;
      setInterval(function(){
        _this.innerTimerList.reduce(function(acc, cur, i){
          cur.callback(cur.args);
          return acc;
        }, _this.innerTimerList)
      }, this.time);  
    }

    return Timer
  }
)();