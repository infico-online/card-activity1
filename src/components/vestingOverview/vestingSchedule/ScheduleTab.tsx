import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { IVestingSchedule } from '../../../interfaces/vestingSchedule.interface';
import { TabProgressBar } from '../../progressBar/TabProgressBar';
import { formatValue } from '../../../utils/formatValue';

interface Props {
    data: IVestingSchedule[];
}

const columnHelper = createColumnHelper<IVestingSchedule>();

const columns = [
    columnHelper.accessor('isUnlocked', {
        header: 'STATUS',
        cell: (info) => (
            <span className="text-center text-sm">
                {info.getValue() ? 'Unlocked' : 'Vesting'}
            </span>
        ),
    }),
    columnHelper.accessor('name', {
        header: 'SCHEDULE',
        cell: (info) => (
            <span className="text-center text-sm">{info.getValue()}</span>
        ),
    }),
    columnHelper.accessor('durationLeft', {
        header: 'DURATION',
        cell: (info) => (
            <>
                <span className="text-center mb-2 text-sm">
                    {info.getValue()} DAYS LEFT
                </span>
                <TabProgressBar
                    completed={info.row.original.durationProgress}
                />
            </>
        ),
    }),
    columnHelper.accessor('unlockedAmount', {
        header: 'UNLOCKED',
        cell: (info) => (
            <>
                <span className="text-center mb-2 text-sm">
                    {formatValue(info.getValue(), '', 0)} /{' '}
                    {formatValue(info.row.original.allocatedAmount, '', 0)}
                </span>
                <TabProgressBar
                    completed={
                        (info.row.original.unlockedAmount * 100) /
                        info.row.original.allocatedAmount
                    }
                />
            </>
        ),
    }),
    columnHelper.accessor('withdrawnAmount', {
        header: 'WITHDRAWN',
        cell: (info) => (
            <>
                <span className="text-center mb-2 text-sm">
                    {formatValue(info.getValue(), '', 0)} /{' '}
                    {formatValue(info.row.original.allocatedAmount, '', 0)}
                </span>
                <TabProgressBar
                    completed={
                        (info.row.original.withdrawnAmount * 100) /
                        info.row.original.allocatedAmount
                    }
                />
            </>
        ),
    }),
    columnHelper.accessor('vestingRateAsString', {
        header: 'VESTING RATE',
        cell: (info) => (
            <span className="text-center text-sm">{info.getValue()}</span>
        ),
    }),
    columnHelper.accessor('availableAmount', {
        header: 'AMOUNT AVAILABLE',
        cell: (info) => (
            <span className="text-center text-sm text-gray-300">
                {formatValue(info.getValue(), '', 0)}
            </span>
        ),
    }),
];

export const ScheduleTab = ({ data }: Props) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <>
            {data.length > 0 ? (
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={header.id}
                                        className={`tab-border !border-t-0 ${
                                            index === 0
                                                ? '!border-l-0'
                                                : index ===
                                                  headerGroup.headers.length - 1
                                                ? '!border-r-0'
                                                : ''
                                        }`}
                                    >
                                        <div className="mx-4 my-2">
                                            <span className="font-kanit-regular color-gray-gradient text-shadow text-sm tracking-[.1em]">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <tr key={row.id}>
                                {row
                                    .getVisibleCells()
                                    .map((cell, cellIndex) => (
                                        <td
                                            key={cell.id}
                                            className={`tab-border ${
                                                rowIndex ===
                                                table.getRowModel().rows
                                                    .length -
                                                    1
                                                    ? '!border-b-0'
                                                    : ''
                                            } ${
                                                cellIndex === 0
                                                    ? '!border-l-0'
                                                    : cellIndex ===
                                                      row.getVisibleCells()
                                                          .length -
                                                          1
                                                    ? '!border-r-0'
                                                    : ''
                                            } ${
                                                !row.getValue('isUnlocked')
                                                    ? 'text-gray-500'
                                                    : 'color-gray-gradient text-shadow'
                                            }`}
                                        >
                                            <div className="flex flex-col m-4 font-kanit-regular">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </div>
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="w-full flex justify-center items-center mt-36">
                    NO VESTING SCHEDULES TO SHOW
                </div>
            )}
        </>
    );
};
