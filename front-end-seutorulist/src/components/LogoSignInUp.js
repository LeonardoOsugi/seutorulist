import styled from '@emotion/styled';


export default function LogoSignInUp(){
    return(
        <>
           <CaixaLogo>
                <p>SeuToru List</p>
           </CaixaLogo>
        </>
    )

}

const CaixaLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10%;

  p {
    font-size: 100px;
    color: cyan;
  }
`