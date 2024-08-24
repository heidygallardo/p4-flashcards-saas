import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography, Grid } from '@mui/material';

const FeaturesSlideshow = () => {
  const features = [
    {
      title: 'AI-Powered Flashcards',
      description: 'Our AI breaks down complex content into easy-to-digest flashcards.',
    },
    {
      title: 'Accessible Anywhere',
      description: 'Study on any device, anywhere, anytime.',
    },
    {
      title: 'Simple and Intuitive',
      description: 'No learning curve. Just enter your text and let the AI do the rest.',
    },
  ];

  return (
    <Box sx={{ my: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#924759ff', textAlign: 'center'}}>
      Why Choose CardGPT?
      </Typography>
      <Carousel>
        {features.map((feature, index) => (
          <Grid container spacing={3} key={index} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#67595e' }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: 'black' }}>
                {feature.description}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
};

export default FeaturesSlideshow;
