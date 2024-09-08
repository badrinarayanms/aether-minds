'use client'
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

import {
  Grid,
  Button,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import {
  writeBatch,
  doc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";

import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";

interface Flashcard {
  front: string;
  back: string;
}

interface Deck {
  name: string;
}

export default function Dashboard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userDecks, setUserDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [selectedDeckCards, setSelectedDeckCards] = useState<Flashcard[]>([]);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [f, setf] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserDecks();
    }
  }, [user]);

  const fetchUserDecks = async () => {
    if (!user) return;
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      setUserDecks(collections);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      const jsonData = await response.json();
  
      if (jsonData && jsonData.flashcards) {
        const parsedFlashcards: Flashcard[] = Array.isArray(jsonData.flashcards) 
          ? jsonData.flashcards 
          : JSON.parse(jsonData.flashcards).flashcards;
        
        setFlashcards(parsedFlashcards);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCardClick = (id: number) => {
    setf(!f);
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditCard = (index: number) => {
    setEditingCard(flashcards[index]);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingCard(null);
  };

  const handleEditDialogSave = () => {
    if (editingCard) {
      const updatedFlashcards = flashcards.map((card, index) =>
        card === editingCard ? { ...editingCard } : card
      );
      setFlashcards(updatedFlashcards);
      handleEditDialogClose();
    }
  };

  const viewDeck = async (deckName: string) => {
    setSelectedDeck(deckName);
    const userId = user?.id as string;
    const userDocRef = doc(collection(db, "users"), userId);
    const deckRef = collection(userDocRef, deckName);
    const querySnapshot = await getDocs(deckRef);
    const cards = querySnapshot.docs.map((doc) => doc.data()) as Flashcard[];
    setSelectedDeckCards(cards);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name for your deck");
      return;
    }

    if (userDecks.length >= 3) {
      alert("You can only have up to 3 flashcard decks");
      return;
    }

    const batch = writeBatch(db);
    const userId = user?.id as string;
    const userDocRef = doc(collection(db, "users"), userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f: Deck) => f.name === name)) {
        alert("A deck with this name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    setName("");
    setText("");
    setFlashcards([]);
    fetchUserDecks();
  };
  const transformStyle = f ? 'rotateY(90deg)' : 'rotateY(0deg)';
  return (
    <div className="h-full rounded-xl bg-gray-100">
      
      
      <main className="flex-grow h-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <SignedIn>
          <div className="px-4 h-full py-6 sm:px-0">
          <div className="">
                  <h1 className='text-5xl text-[#00517A] font-gsans font-bold mb-4'>Welcome to Flash Quest</h1>
              </div>
            <div style={{
    width: '100%',      /* Set the width of the div */
    height: '650px',     /* Set the height of the div */
    overflow: 'auto',    /* Adds scrollbars if content overflows */
    /* Optional: for visual representation */
  }} >
                
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generate New Flashcards
              </h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or topic"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                rows={4}
              />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Flashcards"}
              </button>
            </div>

            {flashcards.length > 0 && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Flashcards Preview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {flashcards.map((flashcard, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-md relative"
                    >
                      <div
                        className={`relative w-full h-40 ${
                          flipped[index] ? "rotate-y-180" : ""
                        } transform transition-transform duration-500`}
                        onClick={() => handleCardClick(index)}
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <div className="absolute inset-0 backface-hidden">
                          <div className="w-full h-full flex items-center justify-center bg-purple-100   shadow rounded-md p-4">
                            <Typography  component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                        <div 
                          className="absolute inset-0 backface-hidden "
                          style={{
                            transform: `rotateY(${flipped[index] ? '0deg' : '0deg'})`,transformStyle: 'preserve-3d',
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center bg-white duration-500 hover:opacity-0 shadow rounded-md p-4">
                            <Typography variant="h6" component="div">
                            {flashcard.front}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <IconButton
                        className="absolute top-2 right-2"
                        onClick={() => handleEditCard(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter deck name"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  />
                  <button
                    onClick={saveFlashcards}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Deck
                  </button>
                </div>
              </div>
            )}

            {userDecks.length > 0 && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Decks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userDecks.map((deck, index) => (
                    <Card
                      key={index}
                      sx={{ maxWidth: 345 }}
                      onClick={() => viewDeck(deck.name)}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {deck.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedDeck && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedDeck} Flashcards
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedDeckCards.map((flashcard, index) => (
  <div key={index} className="relative w-full h-40">
    <div
      className="absolute inset-0 backface-hidden"
      style={{
        transform: 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s',
      }}
    >
      <div className="w-full h-full flex items-center justify-center bg-purple-100 shadow rounded-md p-4">
        <Typography component="div">
          {flashcard.back}
        </Typography>
      </div>
    </div>
    <div
      className="absolute inset-0 backface-hidden"
      style={{
        transform: 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s',
      }}
    >
      <div  style={{transform: 'rotateY(0deg)',transformStyle: 'preserve-3d',}} className="w-full h-full flex items-center justify-center bg-white duration-500  hover:opacity-0 shadow rounded-md p-4"  >
        <Typography component="div">
          {flashcard.front}
        </Typography>
      </div>
    </div>
  </div>
))}

                </div>
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Save Flashcards to a New Deck
              </h2>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Deck Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                onClick={saveFlashcards}
                variant="contained"
                color="primary"
                fullWidth
                disabled={!flashcards.length || isGenerating}
              >
                Save Flashcards
              </Button>
            </div>

            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Flashcard</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Front"
            type="text"
            fullWidth
            value={editingCard?.front || ''}
            onChange={(e) => setEditingCard({ ...editingCard, front: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Back"
            type="text"
            fullWidth
            value={editingCard?.back || ''}
            onChange={(e) => setEditingCard({ ...editingCard, back: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>

            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <Container maxWidth="sm">
            <Typography variant="h5" component="h1" gutterBottom>
              Please sign in to access the dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/sign-in"
            >
              Sign In
            </Button>
          </Container>
        </SignedOut>
      </main>
    </div>
  );
}
