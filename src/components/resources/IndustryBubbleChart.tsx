import { Industry } from "@/types/industry";
import { parseToNearestBillion, formatBillions } from "@/utils/industryDataParser";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from "recharts";
import { Card } from "@/components/ui/card";

interface IndustryBubbleChartProps {
  industries: Industry[];
  onBubbleClick?: (industryName: string) => void;
}

interface BubbleDataPoint {
  name: string;
  investment: number;
  score: number;
  tam: number;
  color: string;
}

const IndustryBubbleChart = ({ industries, onBubbleClick }: IndustryBubbleChartProps) => {
  // Transform industry data for the chart
  const chartData: BubbleDataPoint[] = industries.map((industry, index) => ({
    name: industry.name,
    investment: parseToNearestBillion(industry.investment),
    score: industry.score,
    tam: parseToNearestBillion(industry.tam),
    // Generate greyscale colors based on score ranges
    color: industry.score >= 90 ? '#1f2937' : 
           industry.score >= 85 ? '#4b5563' : 
           industry.score >= 80 ? '#6b7280' : '#9ca3af'
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-bold text-primary mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">Score: <span className="font-medium">{data.score}</span></p>
          <p className="text-sm text-gray-600">Investment: <span className="font-medium">{formatBillions(data.investment)}</span></p>
          <p className="text-sm text-gray-600">TAM: <span className="font-medium">{formatBillions(data.tam)}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 mb-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-2">Industry Opportunity Landscape</h3>
        <p className="text-sm text-gray-600">
          Bubble size represents Total Addressable Market (TAM). Click any bubble to jump to that industry.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            dataKey="investment" 
            name="Investment"
            unit="B"
            label={{ value: 'Investment Amount (Billions)', position: 'insideBottom', offset: -10, style: { fill: '#6b7280', fontWeight: 500 } }}
            stroke="#9ca3af"
          />
          <YAxis 
            type="number" 
            dataKey="score" 
            name="Score"
            domain={[70, 100]}
            label={{ value: 'NIAS Opportunity Score', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontWeight: 500 } }}
            stroke="#9ca3af"
          />
          <ZAxis 
            type="number" 
            dataKey="tam" 
            range={[100, 2000]} 
            name="TAM"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter 
            data={chartData} 
            fill="#3b82f6"
            onClick={(data) => {
              if (data && onBubbleClick) {
                onBubbleClick(data.name);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex gap-6 justify-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1f2937]"></div>
          <span className="text-gray-600">Score 90+</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#4b5563]"></div>
          <span className="text-gray-600">Score 85-89</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#6b7280]"></div>
          <span className="text-gray-600">Score 80-84</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#9ca3af]"></div>
          <span className="text-gray-600">Score &lt;80</span>
        </div>
      </div>
    </Card>
  );
};

export default IndustryBubbleChart;
