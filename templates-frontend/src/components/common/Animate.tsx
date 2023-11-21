import { Box, SxProps } from '@mui/system';
import React, { useEffect, useState } from 'react';

interface AnimateProps {
  sx?: SxProps;
  type?: string; // Adicione tipos para a prop "type"
  delay?: number;
  children: React.ReactNode;
}

export const Animate = (props: AnimateProps) => {
  const [translateY, setTranslateY] = useState(1000);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTranslateY(0);
      setOpacity(1);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (props.type === 'fade') {
    return (
      <Box
        sx={{
          ...props.sx,
          transition: "opacity 1s ease",
          opacity: opacity,
          transitionDelay: props.delay + "s" || "unset"
        }}
      >
        {props.children}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...props.sx,
        transform: `translateY(${translateY}px)`,
        transition: "transform 1s ease, opacity 2s ease",
        opacity: opacity,
        transitionDelay: props.delay + "s" || "unset"
      }}
    >
      {props.children}
    </Box>
  );
};
