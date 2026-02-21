let levelsEndpoint = "https://aredl-roulette.vercel.app/api/aredl/levels";

export async function fetchLevels() {
    try {
        const response = await fetch(levelsEndpoint);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        let result = await response.json();
        result = result.filter((level: any) => (!level.legacy));
        result = result.filter((level: any) => (!level.two_player));

        return result;
    } catch (error) {
        console.error((error as Error).message);
    }
}