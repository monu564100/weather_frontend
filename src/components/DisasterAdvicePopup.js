// // src/components/DisasterAdvicePopup.js
// import React, { useState } from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import CloseIcon from '@mui/icons-material/Close';
// import './DisasterAdvicePopup.css';
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from '@google/generative-ai'; // Ensure this is installed and correctly imported

// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = "AIzaSyDhNyIg2KK9t6Gg1KACxFJdxAEIkEAvvuM";

// async function runChat(prompt) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.9,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 2048,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   const chat = model.startChat({
//     generationConfig,
//     safetySettings,
//     history: [],
//   });

//   const result = await chat.sendMessage(prompt);
//   const response = result.response;
//   console.log(response.text());
//   return response.text();
// }

// function DisasterAdvicePopup() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [advice, setAdvice] = useState('');

//   const handleClick = async () => {
//     if (!isExpanded) {
//       // Fetch AI-generated advice only when expanding
//       const generatedAdvice = await runChat('Provide natural disaster preparedness advice. only 5 small points most important in structured way every instruction in new line with proper space after each statement');
//       setAdvice(generatedAdvice);
//     }
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`advice-popup ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
//       {isExpanded ? (
//         <Box className="expanded-box">
//           <IconButton className="close-icon" onClick={handleClick}>
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h6">Natural Disaster Preparedness</Typography>
//           <Typography variant="body1">{advice}</Typography>
//         </Box>
//       ) : (
//         <ExpandMoreIcon className="bubble-icon" />
//       )}
//     </div>
//   );
// }

// export default DisasterAdvicePopup;






// src/components/DisasterAdvicePopup.js
// src/components/DisasterAdvicePopup.js
// src/components/DisasterAdvicePopup.js
import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel'; // Import the Cancel icon
import './DisasterAdvicePopup.css';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'; // Ensure this is installed and correctly imported

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDhNyIg2KK9t6Gg1KACxFJdxAEIkEAvvuM";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

function DisasterAdvicePopup() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [advice, setAdvice] = useState('');

  const handleClick = async () => {
    if (!isExpanded) {
      // Fetch AI-generated advice only when expanding
      const generatedAdvice = await runChat('Provide natural disaster preparedness advice. only 5 small points most important in structured way every instruction in new line with proper space after each statement');
      setAdvice(generatedAdvice);
    }
    setIsExpanded(!isExpanded);
  };

  const handleCancel = () => {
    setIsExpanded(false); // Close the popup when cancel is clicked
    setAdvice(''); // Optional: Reset the advice text
  };

  return (
    <div className={`advice-popup ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
      {isExpanded ? (
        <Box className="expanded-box">
          <IconButton className="close-icon" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Natural Disaster Preparedness</Typography>
          <Typography variant="body1">{advice}</Typography>
          <IconButton className="cancel-icon" onClick={handleCancel}>
            <CancelIcon /> {/* Cancel icon */}
          </IconButton>
        </Box>
      ) : (
        <div className="bubble-icon">
          <span className="bubble-icon-text">AI</span>
        </div>
      )}
    </div>
  );
}

export default DisasterAdvicePopup;
