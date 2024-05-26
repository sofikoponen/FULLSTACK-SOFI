sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTML document
    deactivate server
    

    Note right of browser: Browser sends the data as JSON-file and server updates data without more HTTP requests
