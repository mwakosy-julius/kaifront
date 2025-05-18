import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, BookOpen, Share2, RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Search, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { set } from "react-hook-form";

interface SequenceInputProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: () => void;
  onSubmit: () => void;
  queryType: "gene" | "protein";
  setQueryType: (type: "gene" | "protein") => void;
  loading: boolean;
  error: string | null;
}

const stats = [
    { icon: Dna, label: "Sequences", value: "DNA/Protein" },
    { icon: BookOpen, label: "Database", value: "NCBI" },
    { icon: Share2, label: "Sequence Format", value: "Fasta" },
  ];
const SequenceInput: React.FC<SequenceInputProps> = ({
  query,
  setQuery,
  queryType,
  setQueryType,
  onSubmit,
  loading,
  error,
  // handleSearch,
}) => {
  const sampleGene = "insulin"
        ;

  const sampleProtein = "testosterone"
  ;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                  <Dna className="w-8 h-8" />
                  Genomic Sequence Searcher
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Quickly search Gene and Protein Sequences from database
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Documentation
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share Results
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      

        <CardContent className="space-y-6">

          <div className="grid grid-cols-3 gap-4 p-4 rounded bg-muted/50">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="p-3 rounded bg-primary/10">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="query">Enter Gene or Protein name</Label>
            <RadioGroup
              defaultValue={queryType}
              value={queryType}
              onValueChange={(value) => setQueryType(value as "gene" | "protein")}
              className="flex items-center space-x-2"
              >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="gene" id="gene" />
                <Label htmlFor="gene" className="cursor-pointer">
                Gene
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="protein" id="protein" />
                <Label htmlFor="protein" className="cursor-pointer">
                Protein
                </Label>
              </div>
            </RadioGroup>
            <Input
            id="query"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            placeholder={`e.g ${
                queryType === "gene" ? sampleGene : sampleProtein
              }`}
            className="min-h-[50px] font-mono text-sm"
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={onSubmit}
              disabled={loading || !query.trim()}
              size="lg"
              variant="primary"
              className="w-full rounded shadow-none"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceInput;