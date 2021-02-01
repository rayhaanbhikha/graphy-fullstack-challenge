import { AnnotationStates } from '../../enums';
import { AnnotationService } from '../Annotations.service';

describe('Annotation Service', () => {

  const fetchSpy = jest.spyOn(window, 'fetch')

  const mockURL = 'http://some-url';
  const annotationService = new AnnotationService(mockURL);

  const annotation = {
    _id: "",
    coord: {
      x: 11,
      y: 16,
    },
    state: AnnotationStates.EDITING,
    text: "",
  }

  beforeEach(jest.clearAllMocks)

  it("should create annotation with default id and centralised coord", () =>
    expect(annotationService.create({ x: 20, y: 25 })).toEqual({
      _id: "",
      coord: {
        x: 11,
        y: 16,
      },
      state: AnnotationStates.EDITING,
      text: "",
    })
  )
  
  it("should serialise annotation correctly by ommiting state", () => {
    const { _id, coord, text } = annotation
    expect(annotationService.serialise(annotation)).toEqual({
      _id,
      coord,
      text
    });
  })
  
  it("should deserialise annotation by adding state", () => {
    const { _id, coord, text } = annotation
    const deserialisedAnnotation = annotationService.deserialise({ _id, coord, text }, AnnotationStates.CLOSED);
    expect(deserialisedAnnotation).toEqual({ _id, coord, text, state: AnnotationStates.CLOSED});
  })

  describe('Get All', () => {
    const { _id, text, coord } = annotation;

    it("should call fetch with correct args", async () => {
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue([{ _id, coord, text }]),
      } as any);
      await annotationService.getAll();
      expect(fetchSpy).toHaveBeenCalledWith(mockURL);
    })

    it("should return correct response", async () => {
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue([{ _id, coord, text }]),
      } as any);
      const annotations = await annotationService.getAll();
      expect(annotations).toEqual([{ _id, coord, text, state: AnnotationStates.CLOSED }]);
    })
  })

  describe('Save', () => {
    const { _id, text, coord } = annotation;

    it("should call fetch with correct args", async () => {
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue({ ...annotation, _id: 'some-mock-id' }),
      } as any);
      await annotationService.save(annotation);
      expect(fetchSpy).toHaveBeenCalledWith(mockURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          _id,
          text,
          coord
        })
      });
    })

    it("should return correct response", async () => {
      const autoGeneratedId = 'some-mock-id'
      const expectedResponse = { ...annotation, _id: autoGeneratedId }
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue(expectedResponse),
      } as any);

      const annotations = await annotationService.save(annotation);
      expect(annotations).toEqual(expectedResponse);
    })
  })

  describe('Update', () => {
    const { _id, text, coord } = annotation;

    it("should call fetch with correct args", async () => {
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue({ ...annotation, _id: 'some-mock-id' }),
      } as any);
      await annotationService.update(annotation);
      expect(fetchSpy).toHaveBeenCalledWith(mockURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          _id,
          text,
          coord
        })
      });
    })

    it("should return correct response", async () => {
      const updatedAnnotation = {
        ...annotation,
        text: 'changed text'
      }
      fetchSpy.mockResolvedValue({ 
        json: jest.fn().mockResolvedValue(updatedAnnotation),
      } as any);

      const annotations = await annotationService.update(updatedAnnotation);
      expect(annotations).toEqual(updatedAnnotation);
    })
  })

  describe('Remove', () => {
    it("should call fetch with correct args", async () => {
      fetchSpy.mockResolvedValue({} as any);
      await annotationService.remove(annotation);
      expect(fetchSpy).toHaveBeenCalledWith(`${mockURL}/${annotation._id}`, {
        method: 'DELETE',
      });
    })
  })
})