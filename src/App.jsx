import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="p-10 flex gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}