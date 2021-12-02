// Common Appbar which is diplayed at the TOP of  application
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logoutUser } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
export interface CustomAppBarProps {
  title: string;
}
// App Bar component
export default function CustomAppBar(props: CustomAppBarProps) {
  const dispatch = useDispatch();

  const twitterUserId = useSelector((state: any) => state.twitterUserId);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
        }}
      >
        <Box
          sx={{
            minHeight: "4rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6" component="div">
              {props.title}
            </Typography>
          </Box>
          {twitterUserId && twitterUserId.length > 0 && (
            <Box p={2}>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Log Out
              </Button>
            </Box>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
