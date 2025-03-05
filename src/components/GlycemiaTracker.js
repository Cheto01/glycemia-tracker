import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const GlycemiaTracker = () => {
  const [records, setRecords] = useState(() => {
    // Load existing records from local storage
    const savedRecords = localStorage.getItem('glycemiaRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [newRecord, setNewRecord] = useState({
    date: '',
    time: '',
    value: '',
    context: ''
  });

  // Update local storage whenever records change
  useEffect(() => {
    localStorage.setItem('glycemiaRecords', JSON.stringify(records));
  }, [records]);

  // Check if the current date already has two records
  const canAddRecord = (date) => {
    return records.filter(record => record.date === date).length < 2;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addRecord = () => {
    // If date is not set, use current date
    const recordDate = newRecord.date || new Date().toISOString().split('T')[0];
    const recordTime = newRecord.time || new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Check if we can add another record for this date
    if (!canAddRecord(recordDate)) {
      alert('Vous avez déjà deux mesures pour cette date.');
      return;
    }

    const recordToAdd = {
      ...newRecord,
      date: recordDate,
      time: recordTime
    };

    setRecords([...records, recordToAdd]);
    
    // Reset form
    setNewRecord({
      date: '',
      time: '',
      value: '',
      context: ''
    });
  };

  const deleteRecord = (indexToRemove) => {
    setRecords(records.filter((_, index) => index !== indexToRemove));
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Heure,Valeur,Contexte\n"
      + records.map(record => 
        `${record.date},${record.time},${record.value},${record.context}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "suivi_glycemie.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Suivi de Glycémie</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={newRecord.date}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="time">Heure</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={newRecord.time}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="value">Valeur de Glycémie (mg/dL)</Label>
            <Input
              type="number"
              id="value"
              name="value"
              value={newRecord.value}
              onChange={handleInputChange}
              min="0"
              className="mt-1"
              placeholder="Ex: 120"
            />
          </div>
          
          <div>
            <Label htmlFor="context">Contexte</Label>
            <Input
              type="text"
              id="context"
              name="context"
              value={newRecord.context}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Avant/Après repas, Jeûne, etc."
            />
          </div>
          
          <Button 
            type="button" 
            onClick={addRecord}
            className="w-full"
          >
            Ajouter la Mesure
          </Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Historique des Mesures</h3>
          {records.length === 0 ? (
            <p className="text-gray-500">Aucune mesure enregistrée</p>
          ) : (
            <div className="space-y-2">
              {records.map((record, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>
                    {record.date} à {record.time} : {record.value} mg/dL 
                    {record.context && ` (${record.context})`}
                  </span>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteRecord(index)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {records.length > 0 && (
          <Button 
            variant="outline" 
            onClick={exportData}
            className="w-full mt-4"
          >
            Exporter les Données (CSV)
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GlycemiaTracker;