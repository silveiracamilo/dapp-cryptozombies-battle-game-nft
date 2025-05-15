import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "antd";
import { AlertStyled, ContentContainer } from "./styles";

const FallbackErrorBoundary: React.FC<FallbackProps> = () => {
  return (
    <ContentContainer>
        <AlertStyled 
          message="Error"
          description={<>
            <strong>Oops something went wrong!</strong>
            <Button onClick={() => window.location.reload()}>Reset</Button>
          </>}
          type="error" 
          showIcon
        />
    </ContentContainer>
  );
}

export default FallbackErrorBoundary;
