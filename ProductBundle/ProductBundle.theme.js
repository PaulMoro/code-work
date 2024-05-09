import { create } from '@theme/create';

export const themed = create(
  new (function () {
    this.wrapper = {
      mr: 'auto',
      // mt: 8,
    };

    this.box = {
      display: 'flex',
      gridGap: ['6%'],
      justifyContent: 'space-between',
      alignItems: 'end',
    };

    this.initPack = {
      border: '1px solid #E3E3E3',
      borderRadius: '4px',
      py: '12px',
      px: '10px',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      gridGap: ['4px'],
      flexDirection: 'column',
      alignItems: 'center',
      bg: '#FFF',
      cursor: 'pointer',
    };

    this.optionOnePack = {
      alignSelf: 'end',
      select: {
        border: '3px solid #A6DACF',
        background: 'linear-gradient(180deg, #E8FAF5 0%, #FFF 100%);',
      },
    };

    this.optionTwoPack = {
      select: {
        border: '3px solid #A6DACF',
        background: 'linear-gradient(180deg, #E8FAF5 0%, #FFF 100%);',
      },
    };

    this.optionThreePack = {
      select: {
        border: '3px solid #F1878E',
        background: 'linear-gradient(180deg, #FFEEF0  0%, #FFF 100%);',
      },
    };

    this.containerPack = {
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    };

    this.containerBundle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '@media screen and (max-width: 768px)': {
        display: 'grid',
        gridTemplateRows: ['1fr'],
      },
    };

    this.titleOne = {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      py: '7px',
      width: '100%',
      color: '#222429',
      textAlign: 'center',
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: '12px',
      textTransform: 'uppercase',
      bg: '#A6DACF',
      '@media screen and (max-width: 768px)': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    };

    this.titleTwo = {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      py: '7px',
      width: '100%',
      color: '#222429',
      textAlign: 'center',
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: '12px',
      textTransform: 'uppercase',
      bg: '#F1878E',
      '@media screen and (max-width: 768px)': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    };

    this.textPack = {
      color: '#222429',
      textAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Gotham',
      fontWeight: '600',
      lineHeight: '18px',
    };

    this.text = {
      color: '#222429',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: '600',
      fontFamily: 'Gotham',
      lineHeight: '14px',
    };

    this.textSave = {
      color: '#BF2E35',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: '700',
      fontFamily: 'Gotham',
      lineHeight: '14px',
    };

    this.image = {
      height: '30px',
      '@media screen and (max-width: 768px)': {
        height: '24px',
        objectFit: 'contain',
      },
    };

    // todo: nested variants should really be button variants that modify primary
    // so that they can be used through a project and not just here
    this.button = {
      variant: 'primary',
      minWidth: '100px',
      width: '100%',
      mt: 8,
      mb: 8,
      outline: 'none',
      '@media only screen and (max-width: 599px)': {
        py: [0, 10],
        px: '24px',
        minWidth: 'initial',
      },
      available: {
        cursor: 'pointer',

        oneTime: {
          bg: 'black',
        },

        subscribe: {
          border: (t) => `1px solid ${t.colors.teal}`,
          bg: 'teal',
          '@media screen and (min-width: 768px)': {
            '&:hover': {
              color: 'teal',
            },
          },
        },
      },

      unavailable: {
        cursor: 'pointer',
        oneTime: {
          bg: 'gray',
          border: (t) => `1px solid ${t.colors.gray}`,
          '@media screen and (min-width: 768px)': {
            '&:hover': {
              bg: 'gray',
              color: 'background',
            },
          },
        },

        subscribe: {
          bg: 'gray',
          border: (t) => `1px solid ${t.colors.teal}`,
          '@media screen and (min-width: 768px)': {
            '&:hover': {
              bg: 'gray',
              color: 'background',
            },
          },
        },
      },
    };
  })()
);
