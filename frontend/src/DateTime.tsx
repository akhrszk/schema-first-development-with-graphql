import React, { HTMLAttributes } from 'react'

export interface DateTimeProps extends HTMLAttributes<HTMLSpanElement> {
  datetime: string
}

export const DateTime: React.FC<DateTimeProps> = ({ datetime, ...props }) => (
  <span {...props}>{new Date(datetime).toLocaleString()}</span>
)

export default DateTime
