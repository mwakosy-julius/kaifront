import React from "react";
import { CodonUsage } from "@/lib/services/tools/codon_usage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CodonTableProps {
  tableHtml: string;
  codonUsage: CodonUsage;
  aminoAcidFilter: string;
  setAminoAcidFilter: (filter: string) => void;
}

interface GroupedCodon {
  aminoAcid: string;
  letter: string;
  codons: {
    codon: string;
    count: number;
    frequency: number;
  }[];
}

const CodonTable: React.FC<CodonTableProps> = ({
  codonUsage,
  aminoAcidFilter,
  setAminoAcidFilter,
}) => {
  // Group codons by amino acid
  const groupedCodons: GroupedCodon[] = [];
  const aminoAcidMap: { [key: string]: { name: string; letter: string } } = {
    Ala: { name: "Alanine", letter: "A" },
    Arg: { name: "Arginine", letter: "R" },
    Asn: { name: "Asparagine", letter: "N" },
    Asp: { name: "Aspartic acid", letter: "D" },
    Cys: { name: "Cysteine", letter: "C" },
    Gln: { name: "Glutamine", letter: "Q" },
    Glu: { name: "Glutamic acid", letter: "E" },
    Gly: { name: "Glycine", letter: "G" },
    His: { name: "Histidine", letter: "H" },
    Ile: { name: "Isoleucine", letter: "I" },
    Leu: { name: "Leucine", letter: "L" },
    Lys: { name: "Lysine", letter: "K" },
    Met: { name: "Methionine", letter: "M" },
    Phe: { name: "Phenylalanine", letter: "F" },
    Pro: { name: "Proline", letter: "P" },
    Ser: { name: "Serine", letter: "S" },
    Thr: { name: "Threonine", letter: "T" },
    Trp: { name: "Tryptophan", letter: "W" },
    Tyr: { name: "Tyrosine", letter: "Y" },
    Val: { name: "Valine", letter: "V" },
    Stop: { name: "Stop codon", letter: "*" },
  };

  // Process codon usage data
  Object.entries(codonUsage).forEach(([codon, data]) => {
    const aminoAcid = data.amino_acid;
    const count = data.count;
    const frequency = data.percentage;

    let group = groupedCodons.find((g) => g.aminoAcid === aminoAcid);
    if (!group) {
      group = {
        aminoAcid,
        letter: aminoAcidMap[aminoAcid]?.letter || "?",
        codons: [],
      };
      groupedCodons.push(group);
    }

    group.codons.push({ codon, count, frequency });
  });

  // Sort groups alphabetically by amino acid
  groupedCodons.sort((a, b) => a.aminoAcid.localeCompare(b.aminoAcid));

  // Filter groups based on search
  const filteredGroups = aminoAcidFilter
    ? groupedCodons.filter(
        (group) =>
          group.aminoAcid
            .toLowerCase()
            .includes(aminoAcidFilter.toLowerCase()) ||
          group.letter.toLowerCase() === aminoAcidFilter.toLowerCase()
      )
    : groupedCodons;

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="amino-acid-filter">Filter by amino acid</Label>
        <Input
          id="amino-acid-filter"
          type="text"
          placeholder="Filter by amino acid (e.g., Ala, A)"
          value={aminoAcidFilter}
          onChange={(e) => setAminoAcidFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amino Acid</TableHead>
              <TableHead>Codon</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead className="text-right">Frequency (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <React.Fragment key={group.aminoAcid}>
                {group.codons.map((codon, i) => (
                  <TableRow key={codon.codon}>
                    {i === 0 && (
                      <TableCell
                        rowSpan={group.codons.length}
                        className="font-medium align-top"
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center justify-center w-6 h-6"
                          >
                            {group.letter}
                          </Badge>
                          <span>{group.aminoAcid}</span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="font-mono">{codon.codon}</TableCell>
                    <TableCell className="text-right">{codon.count}</TableCell>
                    <TableCell className="text-right">
                      {codon.frequency}%
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CodonTable;
