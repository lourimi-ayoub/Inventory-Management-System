import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import type { StockMovement } from "../../types"


interface StockMovementHistoryProps {
  movements: StockMovement[]
}

export function StockMovementHistory({ movements }: StockMovementHistoryProps) {
  const getMovementTypeText = (type: string) => {
    switch (type) {
      case "in":
        return "Stock In"
      case "out":
        return "Stock Out"
      case "adjustment":
        return "Adjustment"
      default:
        return type
    }
  }

  const getMovementVariant = (type: string) => {
    switch (type) {
      case "in":
        return "default" as const
      case "out":
        return "destructive" as const
      case "adjustment":
        return "secondary" as const
      default:
        return "default" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Movements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {movements.slice(0, 10).map((movement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{movement.productName}</div>
                <div className="text-sm text-muted-foreground">{movement.reason}</div>
                <div className="text-xs text-muted-foreground">{new Date(movement.date).toLocaleDateString()}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={getMovementVariant(movement.type)}>{getMovementTypeText(movement.type)}</Badge>
                <div className="font-medium">
                  {movement.type === "out" ? "-" : "+"}
                  {movement.stock}
                </div>
              </div>
            </div>
          ))}

          {movements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <RotateCcw className="mx-auto h-12 w-12 mb-2" />
              <p>No stock movements yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
