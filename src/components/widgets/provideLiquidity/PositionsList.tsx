import { IPositionDetails } from '../../../interfaces/positionDetails.interface';
import { Position } from './Position';

type Props = {
    positions: IPositionDetails[];
    onClick: (position: IPositionDetails) => void;
};

export const PositionsList = ({ positions, onClick }: Props) => (
    <div className="w-full flex flex-col items-center max-h-[25rem] overflow-y-auto px-1 lg:px-4 py-4 mt-2">
        {positions.map((position: IPositionDetails, i: number) => (
            <div key={i} className={`${i !== 0 && 'mt-8'}`}>
                <Position
                    position={position}
                    onClick={() => onClick(position)}
                />
            </div>
        ))}
    </div>
);
