const url = 'https://opentdb.com/api.php?amount=11'
const questions = []
const answers = []
const choise = document.getElementById('choise')
const btn = document.getElementById('btn')
const topic = document.getElementById('topic')
const quizeMessage = document.getElementById('quize-message')
const quizeInformation = document.getElementById('quize-information')

let correct = 0
let countQuize = 0
let nowQuestion = 0

// クイズAPIを取得
const getQuestionAPI = () => {
  topic.innerHTML = "取得中"
  quizeMessage.innerHTML = "少々お待ちください"
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    jsonData.results.forEach(result => {
      questions.push(result)
    })
  })
  .then(() => {
    nextQuestion()
  })
}


// 配列をランダムに並び替える
const arrShuffle = (arr) =>{
  let len = arr.length;
  while(len > 0){
    const rnd = Math.floor(Math.random() * len);
    const tmp = arr[len-1];
    arr[len-1] = arr[rnd];
    arr[rnd] = tmp;
    len--;
  }
}

// 問題に関する情報を取得し、表示する
const setQuestion = () => {
  const nextQuestionCategory = questions[nowQuestion].category
  const nextQuestionDifficulty = questions[nowQuestion].difficulty
  const nextQuestionQuestion = questions[nowQuestion].question

  // 不要なスタートボタンをDOMから削除
  btn.remove()

  // クイズの選択肢を取得し、表示させる
  getQuestionChoise()

  // 選択肢以外のクイズの情報を表示する
  showQuestion(nextQuestionCategory, nextQuestionDifficulty, nextQuestionQuestion)
}

// 選択肢の情報を取得する
const getQuestionChoise = () => {
  // 不正解の解答を配列オブジェクトのanswersに格納する
  questions[nowQuestion].incorrect_answers.forEach( answer => {
    answers.push(answer)
  })

  // 正解の解答を配列オブジェクトanswersに格納する
  answers.push(questions[nowQuestion].correct_answer)

  // answersに格納されている値をランダムに並び替える
  arrShuffle(answers)

  // クイズの選択肢を表示する
  answers.forEach(answer => {
    const choiseBtn = document.createElement('button')
    choiseBtn.innerHTML = answer
    if(answer === questions[nowQuestion].correct_answer){
      choiseBtn.setAttribute('value', 'correct')
    }
    choise.appendChild(choiseBtn)
  });

  // 配列をリセットする
  answers.length = 0
}

// クイズの情報を表示させる
const showQuestion = (category, difficulty, question) => {
  const categoryElement = document.createElement('p')
  const difficultyElement = document.createElement('p')

  // 表示されている値を問題にあった内容に変更する
  topic.innerHTML = `${nowQuestion}問目`
  categoryElement.innerHTML = `【ジャンル】${category}`
  difficultyElement.innerHTML = `【難易度】${difficulty}`
  quizeMessage.innerHTML = question

  // 表示するHTMLの要素を作成する
  quizeInformation.appendChild(categoryElement)
  quizeInformation.appendChild(difficultyElement)

  // 次のクイズを表示させる処理
  choise.addEventListener('click', (e)=>{

    // 前の問題の表示を取り除く
    categoryElement.remove()
    difficultyElement.remove()
    choise.textContent = null;

    // 正解の場合カウントする
    if(e.target.value == 'correct'){ correct++ }
    nextQuestion()
  }, { once: true })
}

// 問題終了後に表示する要素を作成する
const showResult = () => {
  const homeBtn = document.createElement('button')

  // 画面の表示を変更にする
  quizeMessage.innerHTML = "再解にチャレンジしたい場合は以下をクリック"
  homeBtn.innerHTML = "ホームへ戻る"
  topic.innerHTML = `あなたの正答は${correct}問です`

  // ホームボタンを表示させる
  choise.appendChild(homeBtn)

  // ホームボタンをクリックするとリロードされ、トップページに戻る
  homeBtn.addEventListener('click', () => {
    window.location.reload()
  })
}

// 次の問題があれば設定し、なかれば終了する
const nextQuestion = () =>{
  if (questions.length -1 > nowQuestion) {
    nowQuestion++;
    setQuestion()
  } else {
    showResult()
  }
}

btn.addEventListener('click', ()=>{
  getQuestionAPI()
})