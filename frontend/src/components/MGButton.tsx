import { Button } from "@mui/material";
import { ReactNode } from "react";

type MGButtonProps = {
  onClick: () => void;
  children: ReactNode;
  endIcon?: ReactNode;
};

function MGButton({ onClick, children, endIcon }: MGButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={() => onClick()}
      endIcon={endIcon}
      sx={{
        width: "100%",
        flex: "auto",
        borderRadius: 4,
        background: "linear-gradient(45deg,#ff0000, #0000ff)",
        "&:hover": {
          background: "linear-gradient(45deg,rgba(200,0,0,1), rgba(0,0,200,1))",
        },
      }}
    >
      {children}
    </Button>
  );
}

export default MGButton;
