// 10에서 시작해서 2씩 줄어드는 별 출력하기
for (let star = 10; star >= 2; star--) {
  if (star % 2 == 0) {
    console.log('*'.repeat(star));
  }
}

// 9부터 시작해서 2씩 줄어드는 별을 출력함과 동시에 공백이 1,2,3 이런식으로 1씩 증가하는 공백 출력하기
for (let star = 9; star >= 1; star -= 2) {
  console.log(' '.repeat(9 - star / 2) + '*'.repeat(star));
}