import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      height: '100vh',
      padding: theme.spacing(2, 4, 3),
      position: 'absolute',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '40rem',
        width: '35rem',
      },
    },
  })
);

export default function Modal({
  show,
  onClose,
  children,
  title = 'Modal',
  description = '',
}) {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    show && (
      <MuiModal
        aria-labelledby={title}
        aria-describedby={description}
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </MuiModal>
    )
  );
}
