
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ChainDonation｜鏈上捐款平台</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1>🚀 歡迎使用 ChainDonation DApp</h1>
        <p>請選擇您的身份：</p>
        <div style={{ marginTop: '2rem' }}>
          <a href="/upload-project.html" style={linkStyle}>我是企業端：上傳專案</a><br /><br />
          <a href="/donation.html" style={linkStyle}>我是捐款者：我要捐款</a><br /><br />
          <a href="/enterprise-project.html" style={linkStyle}>企業專案管理與收據上傳</a>
        </div>
      </main>
    </>
  );
}

const linkStyle = {
  display: 'inline-block',
  padding: '1rem 2rem',
  margin: '1rem',
  backgroundColor: '#00ffff',
  color: '#000',
  fontWeight: 'bold',
  textDecoration: 'none',
  borderRadius: '8px'
};
