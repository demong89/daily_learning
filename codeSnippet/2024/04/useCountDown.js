const useCountDown = ({ leftTime, ms = 1000, onEnd }) => {
  const countDownTimer = useRef();
  const startTimer = useRef();

  // 记录初试时间
  const startTimeRef = useRef(performance.now());
  // 第一次执行的时间处理 让下一次倒计时调整为整数
  const nextTimeRef = useRef(leftTime % ms);
  const [count, setCount] = useState(leftTime);

  const clearTimer = () => {
    if (countDownTimer.current) {
      clearTimeout(countDownTimer.current);
    }
    startTimer.current && clearTimeout(startTimer.current);
  };

  const startCountDown = () => {
    clearTimer();
    const currentTime = performance.now();
    // 计算每次实际执行的时间
    const executeTime = currentTime - startTimeRef.current;

    // 实际执行时间大于上一次需要执行的时间， 说明执行时间多了 否则需要补上差的时间
    const diffTime =
      executeTime > nextTimeRef.current
        ? executeTime - nextTimeRef.current
        : nextTimeRef.current - executeTime;

    setCount((count) => {
      const c = count - (count % ms === 0 ? ms : count % ms);
      if (c <= 0) return 0;
      return c;
    });

    // 算出下一次的时间、
    nextTimeRef.current =
      executeTime > nextTimeRef.current ? ms - diffTime : diffTime + ms;

    // 重置初始时间
    startTimeRef.current = performance.now();

    countDownTimer.current = setTimeout(() => {
      requestAnimationFrame(startCountDown);
    }, nextTimeRef.current);
  };

  useEffect(() => {
    setCount(leftTime);
    startTimer.current = setTimeout(startCountDown, nextTimeRef.current);

    return () => clearTimer();
  }, [leftTime]);

  useEffect(() => {
    if (count <= 0) {
      onEnd && onEnd();
      clearTimer();
    }
  }, [count]);
  return count;
};
