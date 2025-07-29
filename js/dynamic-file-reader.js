

async function listFilesInRepoDirectory(owner, repo, directoryPath) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        const fileNames = [];
        data.forEach(item => {
            if (item.type === 'file') {
                fileNames.push(item.name);
            }
        });
        return fileNames;

    } catch (error) {
        console.error('Error fetching directory contents:', error);
        return [];
    }
}

listFilesInRepoDirectory()