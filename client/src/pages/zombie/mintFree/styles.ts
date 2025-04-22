import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #1a1a1a url('/bg-apocalipse.jpg') no-repeat center center fixed; */
  /* background-size: cover; */
  min-height: 65vh;
  color: #eee;
`;

export const Card = styled.div`
  background: rgba(20, 20, 20, 0.9);
  border: 1px solid #555;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #ff4040;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const Info = styled.div`
  font-size: 14px;
  margin-bottom: 30px;
  color: #aaa;
`;

export const Button = styled.button`
  background: #ff4040;
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  margin: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

export const Status = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #ffaaaa;
`;

export const Steps = styled.ul`
  text-align: left;
  font-size: 15px;
  margin-bottom: 20px;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
  }

  a {
    color: #6cf;
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 16px 0 8px;
  color: #f98;
`;