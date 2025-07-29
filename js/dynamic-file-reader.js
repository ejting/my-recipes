//TODO make a cookie that will activate this script if it has expired,
// So that there aren't as many frequent pulls + data can stay in cookies
// https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie-with-javascript
// https://stackoverflow.com/questions/2980143/i-want-to-store-javascript-array-as-a-cookie

const recipesDropdown = document.getElementById("all-recipes-dropdown");

//https://api.github.com/repos/ejting/my-recipes/contents/recipes
async function listFilesInRepoDirectory(owner, repo, directoryPath) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}`;

    try {
        console.log("fetching...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        const fileNames = [];
        let i = 0;
        data.forEach(item => {
            if (item.type === 'file') {
                const wordsArray = item.name.substring(0, item.name.indexOf('.')).split('-');
                const capitalizedWords = wordsArray.map(word => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                });
                const correctedName = capitalizedWords.join(' ');
                fileNames.push(correctedName);
                
                const newOption = document.createElement("option");
                newOption.textContent = correctedName;
                newOption.value = i;
                recipesDropdown.appendChild(newOption);
                i++;
            }
            
        });

        // Execute the rest of the code here with all the file names

        return fileNames;

    } catch (error) {
        console.error('Error fetching directory contents:', error);
        return [];
    }
}

const fileNames = listFilesInRepoDirectory("ejting", "my-recipes", "recipes");
console.log(fileNames);
console.log("ran code");