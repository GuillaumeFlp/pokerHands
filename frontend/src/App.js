import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { useDarkMode } from './hooks/UseDarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import i18n from './i18n';
import DialogPopup from './components/dialogPopup/DialogPopup';
import UserCard from './components/userCard/UserCard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#309DB5'
    },
    unknown: {
      main: '#757575'
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#309DB5'
    },
    unknown: {
      main: '#757575'
    }
  }
});

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(i18n.language);
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const userLogged = useSelector((state) => state.userLogged);
  const usersLogged = useSelector((state) => state.usersLogged);
  const [openDialogUsername, setOpenDialogUsername] = useState(true);
  const [inputUsernamevalue, setInputUsernamevalue] = useState('');
  const [openDialogResult, setOpenDialogResult] = useState(false);
  const resultText = useSelector((state) => state.result);

  const handleChangeInputUsernamevalue = (event) => {
    setInputUsernamevalue(event.target.value);
  };

  const handleCloseDialogUsername = () => {
    setOpenDialogUsername(false);
  };

  const handleOpenDialogResult = () => {
    setOpenDialogResult(true);
  };

  const handleCloseDialogResult = () => {
    setOpenDialogResult(false);
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setLanguage(value);
  };

  const loginUser = () => {
    const credentials = { username: inputUsernamevalue };

    fetch(`${window.env.apiUrl}/auth?${new URLSearchParams(credentials)}`, {
      method: 'POST'
    }).then((data) => {
      if (data.status === 200) {
        dispatch({
          type: 'UPDATE_USERLOGGED',
          data: inputUsernamevalue
        });

        setInputUsernamevalue('');
        handleCloseDialogUsername();
      }
    });
  };

  const compareHands = () => {
    const body = {
      black: usersLogged.shift().hand,
      white: usersLogged.pop().hand
    };
    fetch(`${window.env.apiUrl}/game`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    }).then((result) => {
      if (result.status === 200) {
        return result.json();
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    if (resultText != null) {
      handleOpenDialogResult();
    }
  }, [resultText]);

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <div className="App">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img
            style={{ width: 150 }}
            src="images/pokerLogo.png"
            alt="logo poker"
          />
          <Typography variant="h2" component="div" gutterBottom>
            Poker hands
          </Typography>
        </Box>

        {!userLogged ? (
          <DialogPopup
            title={t('EnterYourName')}
            content={
              <TextField
                autoFocus
                margin="dense"
                label={t('name')}
                fullWidth
                variant="standard"
                value={inputUsernamevalue}
                onChange={handleChangeInputUsernamevalue}
              />
            }
            confirm={t('confirm')}
            openState={openDialogUsername}
            confirmFunction={loginUser}
          />
        ) : (
          <>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-evenly"
            >
              {usersLogged.map((item, index) => (
                <Grid item key={index}>
                  <UserCard username={item.username} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <Button
                variant="contained"
                sx={{ width: '200px' }}
                onClick={compareHands}
              >
                {t('compare')}
              </Button>
            </Box>
            <h3>{t('languageSelection')}</h3>
            <FormControl fullWidth>
              <InputLabel id="select-label-language">
                {t('language')}
              </InputLabel>
              <Select
                labelId="select-label-language"
                id="select-language"
                value={language}
                label={t('language')}
                onChange={(event) => handleLanguageChange(event.target.value)}
              >
                <MenuItem value={'fr'}>{t('french')}</MenuItem>
                <MenuItem value={'en-US'}>{t('english')}</MenuItem>
              </Select>
            </FormControl>
            <h3>{t('themeSelection')}</h3>
            <FormControl fullWidth>
              <InputLabel id="select-label-theme">{t('theme')}</InputLabel>
              <Select
                labelId="select-label-theme"
                id="select-theme"
                value={theme}
                label={t('theme')}
                onChange={toggleTheme}
              >
                <MenuItem value={'light'}>{t('light')}</MenuItem>
                <MenuItem value={'dark'}>{t('dark')}</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        <DialogPopup
          title={t('result')}
          content={t('winnerText', {
            name: resultText?.winner,
            hand: resultText?.hand
          })}
          confirm={t('close')}
          openState={openDialogResult}
          confirmFunction={handleCloseDialogResult}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
