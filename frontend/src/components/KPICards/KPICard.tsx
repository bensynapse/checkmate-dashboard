import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  trend,
  icon,
  color = '#1976d2',
}) => {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <TrendingUp sx={{ color: '#4caf50' }} />;
    if (trend < 0) return <TrendingDown sx={{ color: '#f44336' }} />;
    return <TrendingFlat sx={{ color: '#ff9800' }} />;
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: color,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
              {unit && (
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ ml: 0.5, color: 'text.secondary' }}
                >
                  {unit}
                </Typography>
              )}
            </Typography>
            {trend !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                {getTrendIcon()}
                <Typography
                  variant="body2"
                  sx={{
                    ml: 0.5,
                    color: trend > 0 ? '#4caf50' : trend < 0 ? '#f44336' : '#ff9800',
                  }}
                >
                  {Math.abs(trend)}%
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: '50%',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                fontSize: 32,
                '& svg': {
                  fontSize: 'inherit',
                  color: 'inherit',
                },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default KPICard;