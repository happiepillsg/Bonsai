"use client"

import type * as React from "react"
import { Line as RechartsLine, LineChart as RechartsLineChart, Tooltip } from "recharts"

interface ChartContainerProps {
  data: any[]
  xField: string
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ data, xField, children, className }: ChartContainerProps) {
  return (
    <RechartsLineChart width={400} height={100} data={data} className={className}>
      <RechartsLine type="monotone" dataKey={xField} stroke="#8884d8" />
      {children}
    </RechartsLineChart>
  )
}

interface ChartTooltipContentProps {
  className?: string
  children: React.ReactNode
}

export function ChartTooltipContent({ className, children }: ChartTooltipContentProps) {
  return <div className={className}>{children}</div>
}

export const ChartTooltip = Tooltip
export const Line = RechartsLine
export const LineChart = RechartsLineChart

