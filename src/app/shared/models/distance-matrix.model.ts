export class DistanceMatrix {
    public destinationAddresses: string[];
    public originAddresses: string[];
    public rows: [
        {
            elements: [
                {
                    distance: {
                        text: string,
                        value: number
                    },
                    duration: {
                        text: string,
                        value: number
                    },
                    status: string
                }
            ]
        }
    ];
    public status: string;


}

