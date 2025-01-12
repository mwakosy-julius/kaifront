import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SequenceTableProps } from '../types/alignment';

export const SequenceTable: React.FC<SequenceTableProps> = ({ sequence1, sequence2 }) => {
    const tableData = useMemo(() => {
        const s1 = sequence1.split('');
        const s2 = sequence2.split('');
        
        return s1.map((char, index) => ({
            position: index + 1,
            sequence1: char,
            sequence2: s2[index] || '-',
            match: char === s2[index] ? 'Yes' : 'No'
        }));
    }, [sequence1, sequence2]);

    return (
        <div className="rounded border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Position</TableHead>
                        <TableHead>Sequence 1</TableHead>
                        <TableHead>Sequence 2</TableHead>
                        <TableHead>Match</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {tableData.map((row) => (
                        <TableRow key={row.position}>
                            <TableCell className="font-medium">{row.position}</TableCell>
                            <TableCell className="font-mono">{row.sequence1}</TableCell>
                            <TableCell className="font-mono">{row.sequence2}</TableCell>
                            <TableCell>
                                <span className={row.match === 'Yes' ? 'text-green-500' : 'text-red-500'}>
                                    {row.match}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};