import { TopMovingMaterial } from '@/store/api/inventoryApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

interface TopMovingTableProps {
  data: TopMovingMaterial[];
}

export default function TopMovingTable({ data }: TopMovingTableProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon color="success" fontSize="small" />;
      case 'down':
        return <TrendingDownIcon color="error" fontSize="small" />;
      case 'stable':
        return <RemoveIcon color="action" fontSize="small" />;
    }
  };

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        No top moving materials data available
      </Box>
    );
  }

  // getTrendColor is available for future use if needed

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="top moving materials table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Rank</strong></TableCell>
            <TableCell><strong>Material Code</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell align="right"><strong>Usage Velocity</strong></TableCell>
            <TableCell align="center"><strong>Trend</strong></TableCell>
            <TableCell><strong>Unit</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((material, index) => (
            <TableRow
              key={material.id}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              <TableCell>
                <Chip
                  label={`#${index + 1}`}
                  size="small"
                  color={index < 3 ? 'primary' : 'default'}
                />
              </TableCell>
              <TableCell>{material.code}</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{material.name}</TableCell>
              <TableCell>
                <Chip
                  label={material.category}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ fontWeight: 600 }}>
                  {material.usageVelocity ? material.usageVelocity.toLocaleString() : 'N/A'}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {getTrendIcon(material.trend)}
                </Box>
              </TableCell>
              <TableCell>{material.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
