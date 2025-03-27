import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Alert, Button } from "antd";
import { ContentContainer } from "./styles";

const FallbackErrorBoundary: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <ContentContainer>
      <div style={{ alignContent: 'center', height: '100%' }}>
        <Alert 
          message="Erro"
          description={
              <>
              <strong>Algo deu errado!</strong>
              &nbsp;
              <Button onClick={resetErrorBoundary}>Reiniciar</Button>
              </>
          } 
          style={{ width: '300px', marginLeft: 'calc((100% - 300px) / 2)' }}
          type="error" 
          showIcon
        />
      </div>
    </ContentContainer>
	
  );
}

export default FallbackErrorBoundary;
