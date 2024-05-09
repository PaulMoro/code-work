import { create } from '@theme/create';

export const themed = create(
  new (function () {
    this.wrap = {
      borderBottom: '2px solid',
      borderColor: 'lightGray',
      paddingBottom: '18px',
      px: 10,
      position: 'relative',
    };
    this.content = {
      display: 'flex',
      justifyContent: 'spaceBetween',
      width: '100%',
      top: '0px',
    };
    this.container = {
      position: 'relative',
      mx: 40,
    };
    this.heading = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 16,
      letterSpacing: '0.01em',
      fontSize: '12px',
      mb: '20px',
      textAlign: 'center',
      bold: {
        display: 'contents',
        fontWeight: '600',
      },
      ligth: {
        fontWeight: '400',
      },
    };
    this.icon = {
      position: 'absolute',
      bottom: '0px',
      transform: 'translateY(calc(50% - 8px))',
    };
    this.progress = {
      bg: 'lightGray',
      color: 'seafoam',
      height: '11px',
    };
  })()
);
