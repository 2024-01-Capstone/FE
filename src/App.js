import "./App.css";
import { CallGPT } from "./api/gpt";
import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `
        ""안의 내용을 기반으로 퀴즈를 생성하였고 각 퀴즈 요약 옆에 사용자가 해당 퀴즈를 맞혔는지 틀렸는지를 괄호로 구분하였습니다.
        [정답률] : 6/10, 60%
        [노트1] : "수 체계, 연산, 코드 및 핵심 용어 관련 노트"
        [노트1]를 기반으로 생성한 10개의 퀴즈 내용 요약
        1. 아날로그 양은 연속적인 값을 가지고 있습니다. (맞힘)
        2. 2진 체계에는 2개의 숫자가 있습니다. (맞힘)
        3. '비트'는 바이너리 디지트의 약어이며, 2진수에서 사용됩니다. (틀림)
        4. 양의 2진수는 0의 부호 비트를 가지고 있습니다. (틀림)
        5. 16진수 체계는 10개의 숫자와 A~F 알파벳으로 표현됩니다. (틀림)
        6. 10진수는 8로 나누어서 8진수로 변환될 수 있습니다. (맞힘)
        7. 2진수의 1의 보수는 1을 0으로, 0을 1로 변환하여 얻습니다. (맞힘) 
        8. ASCII는 정보의 입출력을 위한 영숫자 코드로 사용됩니다. (맞힘)
        9. BCD는 10진 숫자를 4비트 그룹으로 표현하는 디지털 코드입니다. (틀림)
        10. CRC는 오류 검출 코드의 한 종류로 사용되며, Cyclic Redundancy Check의 약자입니다. (맞힘)

        
        [정답률] : 5/10, 50%
        [노트2] : "상담의 본질과 원리, 상담사의 역할과 덕목에 관한 노트"
        [노트2]를 기반으로 생성한 10개의 퀴즈 내용 요약
        1. 상담은 내담자의 행동 변화를 돕기 위한 인간관계를 통한 조언을 포함합니다. (맞힘)
        2. 상담의 구조는 진실성, 공감적 이해, 수용의 세 가지 요소를 포함합니다. (맞힘)
        3. 상담사는 자기수용 덕목을 가져야 합니다. (맞힘)
        4. 상담의 목적은 자아정체감 확립을 포함합니다. (틀림)
        5. 상담의 형태는 위기 상담을 포함합니다. (틀림)
        6. 상담의 기본원리 중 하나는 비심판적 태도의 원리입니다. (맞힘)
        7. 상담의 과정은 내담자의 느낌과 생각을 수용하는 것이 중요합니다. (틀림)
        8. 상담사의 세 가지 원소는 진실성, 공감적 이해, 수용으로 구성됩니다. (틀림)
        9. 상담의 목적은 대처 기술의 향상을 위한 것입니다. (틀림)
        10. 상담의 형태는 발달 상담을 포함합니다. (맞힘)
        
        [정답률] : 3/5, 60%
        [노트3] : "프랑스어 문법과 관련된 노트"
        [노트3]를 기반으로 생성한 5개의 퀴즈 내용 요약
        1. 프랑스어 명사는 남성과 여성의 두 가지 성별로 나누어집니다. (틀림)
        2. 프랑스어 명사는 단수와 복수로 나누어집니다. (맞힘)
        3. 프랑스어에는 주격, 목적격, 소유격의 세 가지 격이 있습니다. (맞힘)
        4. 프랑스어 형용사는 명사의 성과 수에 따라 굴절됩니다. (틀림)
        5. 프랑스어 부사는 동사, 형용사, 또는 다른 부사를 수정하는데 사용됩니다. (맞힘)
        
        [정답률] : 4/5, 80%
        [노트4] : "중국어 문법과 관련된 노트"
        [노트4]를 기반으로 생성한 5개의 퀴즈 내용 요약
        1. 중국어의 1성 성조는 고르고 평평하게 소리를 내며, 성조에 따라 의미가 달라집니다. (맞힘)
        2. 중국어의 기본 어순은 주어-동사-목적어(SVO)로 구성됩니다. (맞힘)
        3. 중국어에서 시제는 시간 표현 부사를 통해 나타납니다. (맞힘)
        4. 중국어에서 명사를 셀 때에는 양사를 사용합니다. (맞힘)
        5. 중국어 대명사는 성별에 따라 구분되지 않습니다. (틀림)
        
        [정답률] : 5/5, 100%
        [노트5] : "독일어 문법과 관련된 노트"
        [노트5]를 기반으로 생성한 5개의 퀴즈 내용 요약
        1. 명사의 성별은 Genus로 나타내며, 주로 세 가지로 분류됩니다: 남성, 여성, 중성. (맞힘)
        2. 독일어에서 명사의 격은 네 가지로 분류됩니다: 주격, 목적격, 소유격, 여격. (맞힘)
        3. 독일어 동사는 인칭과 시제에 따라 굴절됩니다. (맞힘)
        4. 명사의 성, 수, 격에 따라 변화하는 것은 형용사입니다. (맞힘)
        5. 독일어 문장의 기본 구조는 주어-동사-목적어 (SVO)입니다. (맞힘)
        `,
      });
      setData(message);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  console.log("data>>", data);
  console.log("category>>", data.category);

  return (
    <div className="App">
      <button onClick={handleClickAPICall}>학습 분석하기</button>
      <div>data : {data}</div>
      <div>isLoading : {isLoading ? "loading..." : "finish"} </div>
    </div>
  );
}

export default App;