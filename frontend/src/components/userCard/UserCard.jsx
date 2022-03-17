import { Grid, Skeleton, Typography, Button } from '@mui/material';
import { PersonPin } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function UserCard({ username }) {
  const { t } = useTranslation();
  const userLogged = useSelector((state) => state.userLogged);
  const usersLogged = useSelector((state) => state.usersLogged);

  const getCards = () => {
    const credentials = { username: userLogged };

    fetch(
      `${window.env.apiUrl}/game/cards?${new URLSearchParams(credentials)}`,
      {
        method: 'GET'
      }
    ).then((result) => {
      if (result.status === 200) {
        return result.json();
      } else {
        return null;
      }
    });
  };

  return (
    <Grid
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <PersonPin sx={{ width: 100, height: 100 }} />

      <Typography
        color="textSecondary"
        sx={{ fontSize: 25, textAlign: 'center' }}
      >
        {username ? username : <Skeleton variant="text" />}
      </Typography>
      {username === userLogged ? (
        <Button variant="contained" onClick={getCards}>
          {t('getCards')}
        </Button>
      ) : (
        ''
      )}
      <p>
        {usersLogged.map((elem) =>
          username === elem.username
            ? elem.hand.map((card, index) => (
                <img
                  key={index}
                  style={{ width: 80, marginRight: 5 }}
                  src={`images/cards/${card}.svg`}
                  alt="card"
                />
              ))
            : ''
        )}
      </p>
    </Grid>
  );
}

export default UserCard;
