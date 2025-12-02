1. Checkout and pull to given PR branch.  if not sure which branch to use, ask user for confirmation.
2. Fetch PR comments
    2.1 Use github cli to fetch PR comments by Gemini Code Assist Agent or Codex Agent.
    2.2 Fetch PR Comments every 1 minute until review is complete by Gemini Code Assist Agent or Codex Agent.
    2.2 Stop fetching PR Comments after 7 times try to get review comments.
3. Resolve high & medium priority comments.  
4. Print resolved / unresolved summary.
5. Ask for confirmation before committing.  
6. If confirmed → git add + commit + git push to given PR branch.
