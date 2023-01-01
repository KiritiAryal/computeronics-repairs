import { ChangeEvent, useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  loginMenuClickedValueAction,
  openDialogAction,
} from "../common/actions";
import { useNavigate } from "react-router-dom";
import { loginAction, userAction, logoutAction } from "../login/actions";
import { CUSTOMER, TICKET_MANAGER } from "../../constants/appConstants";
import { LoginPayloadModel } from "../../models/login";
import { useHttp } from "../../components/common/hook/useHttp";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const styles = {
  flexGrow: 1,
};
export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [drawer, setDrawer] = useState(false);
  const [loginPayload, setLoginPayload] = useState<LoginPayloadModel>(
    {} as LoginPayloadModel
  );
  const navigate = useNavigate();
  const [isOtpDialog, setIsOtpDialog] = useState(false);
  // const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const loginMenuItem = useSelector((state: any) => state.loginMenuItem);
  const isDialogOpened = useSelector(
    (state: any) => state.openDialog.isDialogOpen
  );
  const userData = useSelector((state: any) => state.user);
  const { error, data, loading, fetchResource } = useHttp();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    dispatch(userAction());
  }, []);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawer(open);
    };
  useEffect(() => {
    if (userData.userNotFound) {
      setIsOtpDialog(true);
    } else if (userData?.data?._id) {
      setIsOtpDialog(false);
    }
    dispatch(openDialogAction(false));
  }, [userData]);
  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };
  const openDialog = (userType: string): void => {
    dispatch(loginMenuClickedValueAction(userType));
    dispatch(openDialogAction(true));
  };
  const closeDialog = (): void => {
    dispatch(openDialogAction(false));
  };
  const closeOtpDialog = (): void => {
    setIsOtpDialog(false);
  };
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => {
        toggleDrawer(false);
      }}
      onKeyDown={() => {
        toggleDrawer(false);
      }}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginPayload({
      ...loginPayload,
      [name]: value,
    });
  };
  const doLogin = async () => {
    const isManager = loginMenuItem.item === TICKET_MANAGER;
    const payload = {
      contact: loginPayload.contact,
      ...(isManager ? { password: loginPayload.password } : {}),
      ...(userData?.userNotFound ? { otp: "1234" } : {}),
    };
    dispatch(loginAction(payload));
  };
  //Created logic to get the data using custom hook
  // const doLoginCustomHook = async () => {
  //   const isManager = loginMenuItem.item === TICKET_MANAGER;
  //   const payload = {
  //     contact: loginPayload.contact,
  //     ...(isManager ? { password: loginPayload.password } : {}),
  //     ...(userData?.userNotFound ? { otp: "1234" } : {}),
  //   };
  //   const data = {
  //     method: METHOD.POST,
  //     url: payload.otp ? LOGIN_OTP : LOGIN,
  //     data: payload,
  //   };
  //   fetchResource(data);
  // };
  return (
    <>
      <Box sx={styles}>
        <AppBar position="static">
          <Toolbar>
            {userData?.data?._id && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" component="div" sx={styles}>
              Computeronics
            </Typography>
            {!userData?.data?._id ? (
              <Button color="inherit" ref={anchorRef} onClick={handleToggle}>
                Login
              </Button>
            ) : (
              <Button color="inherit" ref={anchorRef} onClick={handleLogout}>
                Logout
              </Button>
            )}
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => {
                            openDialog(CUSTOMER);
                          }}
                        >
                          Customer
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openDialog(TICKET_MANAGER);
                          }}
                        >
                          Manager
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        onClose={() => {
          toggleDrawer(false);
        }}
        sx={{
          width: 250,
          "& .MuiDrawer-paper": {
            marginTop: 10,
          },
        }}
        open={drawer}
        hideBackdrop={true}
      >
        {list()}
      </Drawer>
      <Dialog open={isDialogOpened} onClose={handleClose} fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            value={loginPayload?.contact}
            name="contact"
            label="Enter your Contact"
            type="text"
            fullWidth
            variant="standard"
          />
          {loginMenuItem.item === TICKET_MANAGER && (
            <TextField
              autoFocus
              onChange={handleChange}
              margin="dense"
              id="name"
              name="password"
              value={loginPayload?.password}
              label="Enter your Password"
              type="password"
              fullWidth
              variant="standard"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          {/* Created logic to get the data using custom hook
          <Button onClick={doLoginCustomHook}>Login</Button> */}
          <Button onClick={doLogin}>Login</Button>
        </DialogActions>
      </Dialog>
      {isOtpDialog && (
        <Dialog open={isOtpDialog} onClose={handleClose} fullWidth>
          <DialogTitle>Get Otp</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="name"
              value={loginPayload?.otp}
              name="otp"
              label="Enter your Otp"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeOtpDialog}>Cancel</Button>
            <Button onClick={doLogin}>Login</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
