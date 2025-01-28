import { Button, Card } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const Home = () => {
  const citationText = `@misc{wardatzky2024explanationsservesystematicliterature,
  title={Whom do Explanations Serve? A Systematic Literature Survey of User Characteristics in Explainable Recommender Systems Evaluation}, 
  author={Kathrin Wardatzky and Oana Inel and Luca Rossetto and Abraham Bernstein},
  year={2024},
  eprint={2412.14193},
  archivePrefix={arXiv},
  primaryClass={cs.HC},
  url={https://arxiv.org/abs/2412.14193}, 
}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(citationText);
  };

  return (
    <div style={{ maxWidth: "800px"}}>
      <h1>An Interactive Collection of Explanation Effects and User Characteristics in Recommender Systems</h1>
      <div style={{ fontSize: '16px' }}>
        <p>Adding explanations to recommender systems is said to have multiple benefits, such as increasing user trust 
           or system transparency. Previous work from other application areas suggests that specific user characteristics 
           impact the users' perception of the explanation. However, we rarely find this type of evaluation for recommender 
           systems explanations. </p>
        <p>This site accompanies the survey paper "Whom do explanations serve? A Systematic Literature Survey of User Characteristics 
          in Explainable Recommender Systems Evaluation” (<a href='https://arxiv.org/abs/2412.14193' target="_blank">link</a>)
           which addresses this gap by surveying 124 papers in which recommender systems explanations were evaluated in user studies. </p>
        <p>The Papers page provides an overview of the analyzed articles, the User Characteristics table groups the user characteristics 
          and the measured effects, the Charts page shows the historical development of different features and how often an effect was found 
          or not found for each user characteristic.</p>
        <p>If you find this resource helpful, please cite our paper:</p>
      </div>
      <Card style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.04)' }} >
        {/* <button onClick={copyToClipboard} style={{ position: 'absolute', top: 24, right: 24 }}><CopyOutlined /></button> */}
        <Button 
          onClick={copyToClipboard} 
          style={{ position: 'absolute', top: 18, right: 18 }} 
          type="text" 
          icon={<CopyOutlined />} 
          size={'middle'} 
        />
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <code>{citationText}</code>
        </pre>
      </Card>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', gap: '40px' }}>
        <img src="ddis_txt.svg" alt="UZH Logo" style={{ marginTop: '20px', maxWidth: '250px' }} />
        <img src="uzh-logo.svg" alt="UZH Logo" style={{ marginTop: '20px', maxWidth: '250px' }} />
      </div>
    </div>
  );
};

export default Home;