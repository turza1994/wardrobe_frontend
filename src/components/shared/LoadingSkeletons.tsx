import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full border-border/50">
      <Skeleton className="relative aspect-[4/5] w-full rounded-none" />
      <CardContent className="flex-1 p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-full" />
        <div className="mt-auto pt-2">
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rowCount = 5, colCount = 4 }: { rowCount?: number, colCount?: number }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: colCount }).map((_, i) => (
              <TableHead key={`h-${i}`}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rIndex) => (
            <TableRow key={`r-${rIndex}`}>
              {Array.from({ length: colCount }).map((_, cIndex) => (
                <TableCell key={`c-${rIndex}-${cIndex}`}>
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
